import { useState, useCallback, useRef, useEffect } from "react";
import {
  WorkflowStep,
  VideoMetadata,
  SupportedOutputFormat,
  AdvancedSettings,
  ConversionResult,
  ValidationError,
  RealProgressState,
} from "@/types/converter";
import { ValidationService } from "@/services/validationService";
import { MetadataService, formatBytes } from "@/services/metadataService";
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
  resolution: "Same as Original",
  videoCodec: "Auto (Recommended)",
  bitrate: "Auto",
  fps: "Same as Original",
  audioQuality: "Original",
};

export function useConverter() {
  const [step, setStep] = useState<WorkflowStep>("upload");
  const [file, setFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState<VideoMetadata | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<SupportedOutputFormat>("MP4");
  const [advanced, setAdvanced] = useState<AdvancedSettings>(DEFAULT_ADVANCED_SETTINGS);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [engineLoading, setEngineLoading] = useState(false);
  const [engineStatus, setEngineStatus] = useState("");

  const [progress, setProgress] = useState<RealProgressState>({
    percentage: 0,
    timeSeconds: 0,
    funnyMessage: FUNNY_LOADING_MESSAGES[0],
    statusText: "Initializing engine...",
  });

  const [result, setResult] = useState<ConversionResult | null>(null);
  const [error, setError] = useState<ValidationError | null>(null);

  const startTimeRef = useRef<number>(0);
  const activeUrlRef = useRef<string | null>(null);

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
   * Step 1 & 2: Handle Upload & Analyze Metadata
   */
  const handleFileUpload = useCallback(async (uploadedFile: File) => {
    setError(null);

    // 1. Validate File
    const validation = ValidationService.validateFile(uploadedFile);
    if (!validation.isValid && validation.error) {
      setError(validation.error);
      setStep("error");
      return;
    }

    // 2. Check browser capability
    const cap = ValidationService.checkBrowserCapabilities();
    if (!cap.supported) {
      setError({
        title: "Browser Incompatible",
        message: cap.reason || "Your browser lacks WebAssembly support.",
      });
      setStep("error");
      return;
    }

    setFile(uploadedFile);
    setStep("analyzing");

    try {
      // Analyze file metadata
      const meta = await MetadataService.extractMetadata(uploadedFile);
      setMetadata(meta);

      // Auto-recommend output format (if input is MOV/MKV/AVI -> recommend MP4; if input is MP4 -> recommend WEBM or MP4)
      if (meta.format === "MP4") {
        setSelectedFormat("MP4");
      } else if (meta.format === "GIF") {
        setSelectedFormat("MP4");
      } else {
        setSelectedFormat("MP4");
      }

      setStep("configured");
    } catch (err: unknown) {
      setError({
        title: "Analysis Failed",
        message:
          "Failed to read video properties. The file might be corrupted or encoded with unsupported settings.",
      });
      setStep("error");
    }
  }, []);

  /**
   * Step 4 & 5: Start Real FFmpeg Conversion
   */
  const startConversion = useCallback(async () => {
    if (!file || !metadata) return;

    setStep("converting");
    setProgress({
      percentage: 0,
      timeSeconds: 0,
      funnyMessage: FUNNY_LOADING_MESSAGES[0],
      statusText: "Loading FFmpeg engine...",
    });

    startTimeRef.current = performance.now();

    try {
      setEngineLoading(true);

      // 1. Get FFmpeg instance (lazy loads WASM if first time)
      const ffmpeg = await FFmpegService.getInstance(
        () => {}, // log handler
        (status) => setEngineStatus(status),
      );

      setEngineLoading(false);
      setProgress((p) => ({ ...p, statusText: "Processing media streams..." }));

      // 2. Perform real conversion
      const { outputData, outputFilename } = await ConversionService.convertVideo(
        ffmpeg,
        file,
        metadata,
        selectedFormat,
        advanced,
        (pct, timeSec) => {
          setProgress((prev) => ({
            ...prev,
            percentage: pct,
            timeSeconds: timeSec,
            statusText: `Converting frame streams... (${pct}%)`,
          }));
        },
      );

      // 3. Create download URL
      const { blob, url } = DownloadService.createDownloadUrl(outputData, selectedFormat);
      activeUrlRef.current = url;

      const outputSizeFormatted = formatBytes(outputData.byteLength);

      setResult({
        blob,
        downloadUrl: url,
        filename: outputFilename,
        outputFormat: selectedFormat,
        originalSizeFormatted: metadata.sizeFormatted,
        outputSizeFormatted,
        outputSizeBytes: outputData.byteLength,
        durationSeconds: metadata.duration,
      });

      setStep("done");
    } catch (err: unknown) {
      console.error("Conversion error:", err);
      setEngineLoading(false);
      const errorMessage =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred during processing inside FFmpeg.wasm.";
      setError({
        title: "Conversion Failed",
        message: errorMessage,
      });
      setStep("error");
    }
  }, [file, metadata, selectedFormat, advanced]);

  /**
   * Trigger direct file download
   */
  const downloadConvertedFile = useCallback(() => {
    if (!result) return;
    DownloadService.triggerDownload(result.downloadUrl, result.filename);
  }, [result]);

  /**
   * Reset workflow & perform memory cleanup
   */
  const resetWorkflow = useCallback(() => {
    if (activeUrlRef.current) {
      DownloadService.revokeUrl(activeUrlRef.current);
      activeUrlRef.current = null;
    }

    setStep("upload");
    setFile(null);
    setMetadata(null);
    setSelectedFormat("MP4");
    setAdvanced(DEFAULT_ADVANCED_SETTINGS);
    setShowAdvanced(false);
    setProgress({
      percentage: 0,
      timeSeconds: 0,
      funnyMessage: FUNNY_LOADING_MESSAGES[0],
      statusText: "",
    });
    setResult(null);
    setError(null);
  }, []);

  return {
    step,
    file,
    metadata,
    selectedFormat,
    setSelectedFormat,
    advanced,
    setAdvanced,
    showAdvanced,
    setShowAdvanced,
    engineLoading,
    engineStatus,
    progress,
    result,
    error,
    handleFileUpload,
    startConversion,
    downloadConvertedFile,
    resetWorkflow,
  };
}
