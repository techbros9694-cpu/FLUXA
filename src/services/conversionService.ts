import {
  AdvancedSettings,
  SupportedOutputFormat,
  VideoMetadata,
  QualityPreset,
} from "@/types/converter";
import { formatBytes } from "./metadataService";
import { FFmpegService, WorkerProgressPayload } from "./ffmpegService";
import { FallbackService } from "./fallbackService";
import { ValidationService } from "./validationService";

export interface ConversionArgsOptions {
  inputFilename: string;
  outputFilename: string;
  outputFormat: SupportedOutputFormat;
  advanced?: AdvancedSettings;
}

export class ConversionService {
  /**
   * Estimate output file size based on original size, duration, format and quality preset
   */
  static estimateOutputSize(
    originalSizeBytes: number,
    durationSeconds: number,
    outputFormat: SupportedOutputFormat,
    settings?: AdvancedSettings,
  ): { bytes: number; formatted: string } {
    if (originalSizeBytes <= 0) {
      return { bytes: 0, formatted: "Unknown" };
    }

    const preset: QualityPreset = settings?.qualityPreset || "Balanced";

    // Audio-only (MP3)
    if (outputFormat === "MP3") {
      let kbps = 128;
      if (settings?.audioQuality === "320 kbps") kbps = 320;
      else if (settings?.audioQuality === "256 kbps") kbps = 256;
      else if (settings?.audioQuality === "192 kbps") kbps = 192;
      else if (settings?.audioQuality === "128 kbps") kbps = 128;
      else if (preset === "High Quality") kbps = 192;
      else if (preset === "Small Size") kbps = 96;

      const duration = durationSeconds > 0 ? durationSeconds : 60;
      const estimatedBytes = Math.round((kbps * 1000 * duration) / 8);
      return {
        bytes: estimatedBytes,
        formatted: formatBytes(estimatedBytes),
      };
    }

    // GIF animation
    if (outputFormat === "GIF") {
      const duration = durationSeconds > 0 ? durationSeconds : 10;
      let est = Math.round(duration * 250000);
      if (preset === "High Quality") est = Math.round(est * 1.4);
      if (preset === "Small Size") est = Math.round(est * 0.6);
      return {
        bytes: est,
        formatted: formatBytes(est),
      };
    }

    // Standard Video
    let ratio = 0.7; // Balanced preset default (~70% of original)
    if (preset === "High Quality") {
      ratio = 1.0;
    } else if (preset === "Small Size") {
      ratio = 0.45;
    }

    if (settings?.resolution) {
      if (settings.resolution.includes("720p")) ratio *= 0.7;
      else if (settings.resolution.includes("480p")) ratio *= 0.45;
      else if (settings.resolution.includes("360p")) ratio *= 0.3;
    }

    if (settings?.bitrate && settings.bitrate !== "Auto" && durationSeconds > 0) {
      const mbps = parseFloat(settings.bitrate);
      if (!isNaN(mbps) && mbps > 0) {
        const customBytes = Math.round((mbps * 1000000 * durationSeconds) / 8);
        return {
          bytes: customBytes,
          formatted: formatBytes(customBytes),
        };
      }
    }

    let estBytes = Math.round(originalSizeBytes * ratio);
    if (estBytes < 100000 && originalSizeBytes > 200000) {
      estBytes = 200000;
    }

    return {
      bytes: estBytes,
      formatted: formatBytes(estBytes),
    };
  }

  /**
   * Generate unique output filename preserving original filename and updating extension.
   */
  static getUniqueOutputFilename(
    originalFilename: string,
    outputFormat: SupportedOutputFormat,
    existingFilenames: string[] | Set<string> = [],
  ): string {
    const existingSet =
      existingFilenames instanceof Set ? existingFilenames : new Set(existingFilenames);

    const lastDotIndex = originalFilename.lastIndexOf(".");
    const baseName =
      lastDotIndex > 0 ? originalFilename.substring(0, lastDotIndex) : originalFilename;
    const targetExt = outputFormat.toLowerCase();

    let candidate = `${baseName}.${targetExt}`;
    if (existingSet.has(candidate)) {
      let counter = 1;
      while (existingSet.has(`${baseName} (${counter}).${targetExt}`)) {
        counter++;
      }
      candidate = `${baseName} (${counter}).${targetExt}`;
    }

    return candidate;
  }

  /**
   * Execute video conversion using WebWorker off main thread
   */
  static async convertVideo(
    id: string,
    inputFile: File,
    metadata: VideoMetadata,
    targetFormat: SupportedOutputFormat,
    advanced?: AdvancedSettings,
    onProgress?: (payload: WorkerProgressPayload) => void,
    existingFilenames?: string[] | Set<string>,
  ): Promise<{ outputData: Uint8Array; outputFilename: string }> {
    const existingList = Array.from(existingFilenames || []);

    try {
      const result = await FFmpegService.convertVideoInWorker(
        id,
        inputFile,
        metadata,
        targetFormat,
        advanced,
        onProgress,
        existingList,
      );

      const outputBytes = new Uint8Array(result.outputBuffer);
      const val = ValidationService.validateConvertedOutput(
        outputBytes,
        targetFormat,
        inputFile.size,
      );
      if (!val.isValid) {
        throw new Error(val.error || "Generated output failed quality verification.");
      }

      return {
        outputData: outputBytes,
        outputFilename: result.outputFilename,
      };
    } catch (err) {
      console.warn("FFmpeg WASM error, switching to FallbackService transcoder:", err);
      return await FallbackService.convert(
        inputFile,
        metadata,
        targetFormat,
        advanced,
        onProgress,
        existingList,
      );
    }
  }
}
