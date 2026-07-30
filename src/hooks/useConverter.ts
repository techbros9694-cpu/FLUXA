import { useState, useCallback, useRef, useEffect } from "react";
import {
  WorkflowStep,
  VideoMetadata,
  SupportedOutputFormat,
  AdvancedSettings,
  ValidationError,
  RealProgressState,
  BatchItem,
} from "@/types/converter";
import { ValidationService } from "@/services/validationService";
import {
  MetadataService,
  formatBytes,
  getItemInputFormat,
  getValidFallbackFormat,
} from "@/services/metadataService";
import { FFmpegService } from "@/services/ffmpegService";
import { ConversionService } from "@/services/conversionService";
import { DownloadService } from "@/services/downloadService";

export const FUNNY_LOADING_MESSAGES = [
  "🎬 Negotiating with pixels...",
  "📼 Teaching video how to change outfits...",
  "🐧 Convincing FFmpeg politely...",
  "🚀 Compressing cinematic greatness...",
  "🧃 Pouring extra smoothness...",
  "☕ Giving your video coffee...",
  "🧠 Thinking really hard...",
  "🎉 Almost there...",
];

export const DEFAULT_ADVANCED_SETTINGS: AdvancedSettings = {
  qualityPreset: "Balanced",
  resolution: "Same as Original",
  videoCodec: "Auto (Recommended)",
  bitrate: "Auto",
  fps: "Same as Original",
  audioQuality: "Original",
};

export function useConverter() {
  const [step, setStep] = useState<WorkflowStep>("upload");
  const [queue, setQueue] = useState<BatchItem[]>([]);
  const [selectedFormat, setSelectedFormatState] = useState<SupportedOutputFormat>("MP4");
  const [advanced, setAdvancedState] = useState<AdvancedSettings>(DEFAULT_ADVANCED_SETTINGS);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [engineLoading, setEngineLoading] = useState(false);
  const [engineStatus, setEngineStatus] = useState("");

  const [progress, setProgress] = useState<RealProgressState>({
    percentage: 0,
    timeSeconds: 0,
    funnyMessage: FUNNY_LOADING_MESSAGES[0],
    statusText: "Initializing engine...",
  });

  const [error, setError] = useState<ValidationError | null>(null);

  const isConvertingRef = useRef<boolean>(false);
  const cancelRequestedRef = useRef<boolean>(false);

  // Preload FFmpeg in background when hook mounts
  useEffect(() => {
    FFmpegService.preload();
  }, []);

  // Rotate funny messages during conversion
  useEffect(() => {
    if (step !== "converting") return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const nextIdx = Math.floor((prev.percentage / 100) * FUNNY_LOADING_MESSAGES.length);
        const clampedIdx = Math.min(FUNNY_LOADING_MESSAGES.length - 1, Math.max(0, nextIdx));
        return {
          ...prev,
          funnyMessage: FUNNY_LOADING_MESSAGES[clampedIdx],
        };
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [step]);

  /**
   * Set global output format & apply to all items in queue, ensuring target format never matches item's input format
   */
  const setSelectedFormat = useCallback((format: SupportedOutputFormat) => {
    setSelectedFormatState(format);
    setQueue((prev) =>
      prev.map((item) => {
        if (item.status !== "waiting") return item;
        const inputFmt = getItemInputFormat(item);
        const validTarget = getValidFallbackFormat(inputFmt, format);
        return { ...item, outputFormat: validTarget };
      }),
    );
  }, []);

  /**
   * Set global advanced settings & apply to all waiting items in queue
   */
  const setAdvanced = useCallback((settings: AdvancedSettings) => {
    setAdvancedState(settings);
    setQueue((prev) =>
      prev.map((item) =>
        item.status === "waiting" ? { ...item, advancedSettings: settings } : item,
      ),
    );
  }, []);

  /**
   * Update output format for an individual item, preventing same format as input
   */
  const updateItemFormat = useCallback((id: string, format: SupportedOutputFormat) => {
    setQueue((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const inputFmt = getItemInputFormat(item);
        const validTarget = getValidFallbackFormat(inputFmt, format);
        return { ...item, outputFormat: validTarget };
      }),
    );
  }, []);

  /**
   * Handle multiple uploaded files (Drag & Drop or Picker)
   */
  const handleMultipleFileUpload = useCallback(
    async (fileList: FileList | File[]) => {
      setError(null);
      const files = Array.from(fileList);

      if (files.length === 0) return;

      // 1. Check browser capability
      const cap = ValidationService.checkBrowserCapabilities();
      if (!cap.supported) {
        setError({
          title: "Browser Incompatible",
          message: cap.reason || "Your browser lacks WebAssembly support.",
        });
        setStep("error");
        return;
      }

      setStep("analyzing");

      const validFiles: File[] = [];
      let lastError: ValidationError | null = null;

      for (const f of files) {
        const val = ValidationService.validateFile(f);
        if (val.isValid) {
          validFiles.push(f);
        } else if (val.error) {
          lastError = val.error;
        }
      }

      if (validFiles.length === 0) {
        setError(
          lastError || {
            title: "No Valid Files",
            message: "None of the selected files were valid video formats.",
          },
        );
        setStep("error");
        return;
      }

      // Analyze files in parallel for maximum speed
      const metadataList = await Promise.all(
        validFiles.map((f) => MetadataService.extractMetadata(f).catch(() => null)),
      );

      const newItems: BatchItem[] = validFiles.map((f, idx) => {
        const meta = metadataList[idx];
        const inputFmt = getItemInputFormat({ file: f, metadata: meta });
        const validTarget = getValidFallbackFormat(inputFmt, selectedFormat);

        return {
          id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}-${idx}`,
          file: f,
          metadata: meta,
          outputFormat: validTarget,
          advancedSettings: advanced,
          status: "waiting",
          progress: 0,
        };
      });

      setQueue((prev) => {
        const combined = [...prev, ...newItems];

        // Check if all items in combined queue share the same input format
        const allInputFormats = combined.map(getItemInputFormat);
        const firstFmt = allInputFormats[0];
        const allShareSame =
          allInputFormats.length > 0 && allInputFormats.every((f) => f === firstFmt);

        let effectiveGlobalFormat = selectedFormat;
        if (allShareSame && selectedFormat.toUpperCase() === firstFmt.toUpperCase()) {
          effectiveGlobalFormat = getValidFallbackFormat(firstFmt, "MKV");
          setSelectedFormatState(effectiveGlobalFormat);
        }

        return combined.map((item) => {
          if (item.status !== "waiting") return item;
          const inputFmt = getItemInputFormat(item);
          const validTarget = getValidFallbackFormat(inputFmt, effectiveGlobalFormat);
          return { ...item, outputFormat: validTarget };
        });
      });

      setStep("configured");
    },
    [selectedFormat, advanced],
  );

  /**
   * Single file wrapper
   */
  const handleFileUpload = useCallback(
    (file: File) => {
      handleMultipleFileUpload([file]);
    },
    [handleMultipleFileUpload],
  );

  /**
   * Remove individual item from queue
   */
  const removeItem = useCallback(
    (id: string) => {
      setQueue((prev) => {
        const target = prev.find((i) => i.id === id);
        if (target?.result?.downloadUrl) {
          DownloadService.revokeUrl(target.result.downloadUrl);
        }
        const updated = prev.filter((i) => i.id !== id);
        if (updated.length === 0) {
          setStep("upload");
          return [];
        }

        // Re-evaluate if remaining items share the same input format
        const allInputFormats = updated.map(getItemInputFormat);
        const firstFmt = allInputFormats[0];
        const allShareSame =
          allInputFormats.length > 0 && allInputFormats.every((f) => f === firstFmt);

        if (allShareSame && selectedFormat.toUpperCase() === firstFmt.toUpperCase()) {
          const fallback = getValidFallbackFormat(firstFmt, "MKV");
          setSelectedFormatState(fallback);

          return updated.map((item) => {
            if (item.status !== "waiting") return item;
            const inputFmt = getItemInputFormat(item);
            return { ...item, outputFormat: getValidFallbackFormat(inputFmt, fallback) };
          });
        }

        return updated;
      });
    },
    [selectedFormat],
  );

  /**
   * Clear entire queue
   */
  const clearQueue = useCallback(() => {
    setQueue((prev) => {
      prev.forEach((item) => {
        if (item.result?.downloadUrl) {
          DownloadService.revokeUrl(item.result.downloadUrl);
        }
      });
      return [];
    });
    setStep("upload");
    setError(null);
  }, []);

  /**
   * Start sequential conversion of all waiting items in queue
   */
  const startConversion = useCallback(async () => {
    if (queue.length === 0) return;

    cancelRequestedRef.current = false;
    isConvertingRef.current = true;
    setStep("converting");

    try {
      setEngineLoading(true);
      setEngineStatus("Initializing FFmpeg WebAssembly Engine...");

      // 1. Initialize FFmpeg instance once
      const ffmpeg = await FFmpegService.getInstance(
        () => {},
        (status) => setEngineStatus(status),
      );

      setEngineLoading(false);

      // 2. Convert each waiting item sequentially
      for (let i = 0; i < queue.length; i++) {
        if (cancelRequestedRef.current) {
          break;
        }

        const currentItem = queue[i];
        if (currentItem.status === "completed") continue;

        // Yield to browser UI thread to keep interface responsive
        await new Promise((resolve) => setTimeout(resolve, 16));

        // Revoke old download URL if re-converting item
        if (currentItem.result?.downloadUrl) {
          DownloadService.revokeUrl(currentItem.result.downloadUrl);
        }

        // Update item status to converting
        setQueue((prev) =>
          prev.map((item, idx) =>
            idx === i ? { ...item, status: "converting", progress: 0 } : item,
          ),
        );

        // Extract metadata if missing
        let meta = currentItem.metadata;
        if (!meta) {
          try {
            meta = await MetadataService.extractMetadata(currentItem.file);
            setQueue((prev) =>
              prev.map((item, idx) => (idx === i ? { ...item, metadata: meta } : item)),
            );
          } catch {
            meta = {
              filename: currentItem.file.name,
              fileSize: currentItem.file.size,
              sizeFormatted: formatBytes(currentItem.file.size),
              format: "MP4",
              container: "MP4",
              videoCodec: "H.264",
              audioCodec: "AAC",
              resolution: "1920x1080",
              width: 1920,
              height: 1080,
              duration: 60,
              durationFormatted: "01:00",
              fps: "30 FPS",
            };
          }
        }

        // Convert item
        try {
          // Collect already generated output filenames in this queue batch
          const existingFilenames = queue
            .map((item) => item.result?.filename)
            .filter((name): name is string => Boolean(name));

          const { outputData, outputFilename } = await ConversionService.convertVideo(
            ffmpeg,
            currentItem.file,
            meta,
            currentItem.outputFormat,
            currentItem.advancedSettings,
            (pct, timeSec) => {
              setQueue((prev) =>
                prev.map((item, idx) => (idx === i ? { ...item, progress: pct } : item)),
              );
              setProgress({
                percentage: pct,
                timeSeconds: timeSec,
                funnyMessage: FUNNY_LOADING_MESSAGES[0],
                statusText: `Converting ${currentItem.file.name} (${pct}%)`,
              });
            },
            existingFilenames,
          );

          // Create download blob & url
          const { blob, url } = DownloadService.createDownloadUrl(
            outputData,
            currentItem.outputFormat,
          );
          const outputSizeFormatted = formatBytes(outputData.byteLength);

          const conversionRes = {
            blob,
            downloadUrl: url,
            filename: outputFilename,
            outputFormat: currentItem.outputFormat,
            originalSizeFormatted: meta.sizeFormatted,
            outputSizeFormatted,
            outputSizeBytes: outputData.byteLength,
            durationSeconds: meta.duration,
          };

          setQueue((prev) =>
            prev.map((item, idx) =>
              idx === i
                ? {
                    ...item,
                    status: "completed",
                    progress: 100,
                    result: conversionRes,
                  }
                : item,
            ),
          );
        } catch (err: unknown) {
          const errMsg =
            err instanceof Error ? err.message : "Conversion failed in browser FFmpeg.";
          console.error(`Failed converting ${currentItem.file.name}:`, err);

          // Mark item as failed and continue remaining queue (Requirement 9)
          setQueue((prev) =>
            prev.map((item, idx) =>
              idx === i
                ? {
                    ...item,
                    status: "failed",
                    progress: 0,
                    error: errMsg,
                  }
                : item,
            ),
          );
        }
      }

      isConvertingRef.current = false;
      setStep("done");
    } catch (err: unknown) {
      isConvertingRef.current = false;
      setEngineLoading(false);
      const errorMessage =
        err instanceof Error ? err.message : "Conversion processing failed inside browser.";
      setError({
        title: "Batch Conversion Error",
        message: errorMessage,
      });
      setStep("done");
    }
  }, [queue]);

  /**
   * Cancel ongoing conversion batch
   */
  const cancelConversion = useCallback(() => {
    cancelRequestedRef.current = true;
    isConvertingRef.current = false;
    setStep("configured");
    setQueue((prev) =>
      prev.map((item) =>
        item.status === "converting" ? { ...item, status: "waiting", progress: 0 } : item,
      ),
    );
  }, []);

  /**
   * Download individual item output file
   */
  const downloadItem = useCallback(
    (id: string) => {
      const item = queue.find((i) => i.id === id);
      if (item?.result) {
        DownloadService.triggerDownload(item.result.downloadUrl, item.result.filename);
      }
    },
    [queue],
  );

  /**
   * Download all completed items as a single ZIP archive
   */
  const downloadAllAsZip = useCallback(async () => {
    const completedItems = queue
      .filter((item) => item.status === "completed" && item.result)
      .map((item) => ({
        filename: item.result!.filename,
        blob: item.result!.blob,
      }));

    if (completedItems.length === 0) return;

    if (completedItems.length === 1) {
      DownloadService.triggerDownload(
        queue.find((i) => i.status === "completed")!.result!.downloadUrl,
        completedItems[0].filename,
      );
      return;
    }

    await DownloadService.downloadAllAsZip(completedItems, "videomorph-batch-converted.zip");
  }, [queue]);

  /**
   * Reset workflow and revoke all blob URLs
   */
  const resetWorkflow = useCallback(() => {
    cancelRequestedRef.current = true;
    isConvertingRef.current = false;
    queue.forEach((item) => {
      if (item.result?.downloadUrl) {
        DownloadService.revokeUrl(item.result.downloadUrl);
      }
    });
    setQueue([]);
    setStep("upload");
    setSelectedFormatState("MP4");
    setAdvancedState(DEFAULT_ADVANCED_SETTINGS);
    setShowAdvanced(false);
    setError(null);
  }, [queue]);

  return {
    step,
    queue,
    selectedFormat,
    setSelectedFormat,
    updateItemFormat,
    advanced,
    setAdvanced,
    showAdvanced,
    setShowAdvanced,
    engineLoading,
    engineStatus,
    progress,
    error,
    handleFileUpload,
    handleMultipleFileUpload,
    removeItem,
    clearQueue,
    startConversion,
    cancelConversion,
    downloadItem,
    downloadAllAsZip,
    resetWorkflow,
  };
}
