import { FFmpeg } from "@ffmpeg/ffmpeg";
import { FFmpegService } from "./ffmpegService";
import {
  AdvancedSettings,
  SupportedOutputFormat,
  VideoMetadata,
  QualityPreset,
} from "@/types/converter";
import { formatBytes } from "./metadataService";

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
      ratio = 1.0; // High Quality (~100% of original)
    } else if (preset === "Small Size") {
      ratio = 0.45; // Small Size (~45% of original)
    }

    // Adjust ratio if resolution is scaled down
    if (settings?.resolution) {
      if (settings.resolution.includes("720p")) ratio *= 0.7;
      else if (settings.resolution.includes("480p")) ratio *= 0.45;
      else if (settings.resolution.includes("360p")) ratio *= 0.3;
    }

    // Override if custom bitrate is set
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
   * Construct optimal FFmpeg command flags balancing speed, quality, and output file size
   */
  static buildFFmpegArgs(opts: ConversionArgsOptions): string[] {
    const { inputFilename, outputFilename, outputFormat, advanced } = opts;
    const args: string[] = ["-i", inputFilename];
    const preset: QualityPreset = advanced?.qualityPreset || "Balanced";

    // 1. Audio-only (MP3)
    if (outputFormat === "MP3") {
      args.push("-vn"); // Strip video
      if (advanced?.audioQuality === "Mute Audio") {
        args.push("-an");
      } else {
        let audioBitrate = "128k";
        if (advanced?.audioQuality?.includes("kbps")) {
          audioBitrate = advanced.audioQuality.replace(" ", "");
        } else if (preset === "High Quality") {
          audioBitrate = "192k";
        } else if (preset === "Small Size") {
          audioBitrate = "96k";
        }
        args.push("-c:a", "libmp3lame", "-b:a", audioBitrate);
      }
      args.push("-y", outputFilename);
      return args;
    }

    // 2. GIF format
    if (outputFormat === "GIF") {
      let fps = 12;
      if (advanced?.fps && advanced.fps !== "Same as Original") {
        const parsed = parseInt(advanced.fps);
        if (!isNaN(parsed)) fps = parsed;
      } else if (preset === "Small Size") {
        fps = 10;
      } else if (preset === "High Quality") {
        fps = 15;
      }

      let scaleFilter = "scale=480:-1:flags=fast_bilinear";
      if (advanced?.resolution && advanced.resolution !== "Same as Original") {
        if (advanced.resolution.includes("720p")) scaleFilter = "scale=1280:-1:flags=fast_bilinear";
        else if (advanced.resolution.includes("480p"))
          scaleFilter = "scale=854:-1:flags=fast_bilinear";
        else if (advanced.resolution.includes("360p"))
          scaleFilter = "scale=640:-1:flags=fast_bilinear";
      }

      args.push("-vf", `fps=${fps},${scaleFilter}`);
      args.push("-an"); // No audio in GIF
      args.push("-y", outputFilename);
      return args;
    }

    // 3. Resolution & Video Filters
    const videoFilters: string[] = [];
    if (advanced?.resolution && advanced.resolution !== "Same as Original") {
      if (advanced.resolution.includes("4K")) videoFilters.push("scale=3840:-2");
      else if (advanced.resolution.includes("1080p")) videoFilters.push("scale=1920:-2");
      else if (advanced.resolution.includes("720p")) videoFilters.push("scale=1280:-2");
      else if (advanced.resolution.includes("480p")) videoFilters.push("scale=854:-2");
      else if (advanced.resolution.includes("360p")) videoFilters.push("scale=640:-2");
    }

    if (videoFilters.length > 0) {
      args.push("-vf", videoFilters.join(","));
    }

    // 4. Frame rate (preserve original unless explicitly requested)
    if (advanced?.fps && advanced.fps !== "Same as Original") {
      const fpsVal = parseInt(advanced.fps);
      if (!isNaN(fpsVal)) {
        args.push("-r", fpsVal.toString());
      }
    }

    // 5. Codec & Quality CRF / Bitrate Configuration
    const userCodec = advanced?.videoCodec || "Auto (Recommended)";
    const customBitrate = advanced?.bitrate && advanced.bitrate !== "Auto";

    // Determine H.264 CRF based on qualityPreset (optimizing for speed & visual quality)
    let h264Crf = "24";
    if (preset === "High Quality") h264Crf = "20";
    else if (preset === "Small Size") h264Crf = "28";

    // Determine VP9 CRF
    let vp9Crf = "32";
    if (preset === "High Quality") vp9Crf = "24";
    else if (preset === "Small Size") vp9Crf = "40";

    switch (outputFormat) {
      case "MP4":
      case "M4V":
      case "MOV":
      case "MKV":
      case "TS": {
        if (userCodec.includes("H.265") || userCodec.includes("HEVC")) {
          args.push("-c:v", "libx265", "-preset", "ultrafast");
          if (!customBitrate) args.push("-crf", (parseInt(h264Crf) + 2).toString());
        } else if (userCodec.includes("VP9")) {
          args.push("-c:v", "libvpx-vp9", "-deadline", "realtime", "-cpu-used", "8", "-b:v", "0");
          if (!customBitrate) args.push("-crf", vp9Crf);
        } else {
          // Default H.264 with ultrafast preset for maximum WASM performance
          args.push("-c:v", "libx264", "-preset", "ultrafast", "-pix_fmt", "yuv420p");
          if (!customBitrate) args.push("-crf", h264Crf);
        }

        if (outputFormat === "MP4" || outputFormat === "MOV" || outputFormat === "M4V") {
          args.push("-movflags", "+faststart");
        }
        if (outputFormat === "TS") {
          args.push("-f", "mpegts");
        }
        break;
      }

      case "WEBM": {
        args.push(
          "-c:v",
          "libvpx-vp9",
          "-deadline",
          "realtime",
          "-cpu-used",
          "8",
          "-b:v",
          "0",
          "-c:a",
          "libvorbis",
        );
        if (!customBitrate) {
          args.push("-crf", vp9Crf);
        }
        break;
      }

      case "AVI":
        args.push(
          "-c:v",
          "mpeg4",
          "-q:v",
          preset === "High Quality" ? "4" : preset === "Small Size" ? "12" : "7",
          "-c:a",
          "mp3",
        );
        break;

      case "WMV":
        args.push(
          "-c:v",
          "wmv2",
          "-q:v",
          preset === "High Quality" ? "4" : preset === "Small Size" ? "12" : "7",
          "-c:a",
          "wmav2",
        );
        break;

      case "FLV":
        args.push(
          "-c:v",
          "flv1",
          "-q:v",
          preset === "High Quality" ? "4" : preset === "Small Size" ? "12" : "7",
          "-c:a",
          "mp3",
        );
        break;

      case "MPEG":
        args.push(
          "-c:v",
          "mpeg2video",
          "-q:v",
          preset === "High Quality" ? "4" : preset === "Small Size" ? "12" : "8",
          "-c:a",
          "mp2",
        );
        break;

      case "OGV":
        args.push(
          "-c:v",
          "libtheora",
          "-q:v",
          preset === "High Quality" ? "7" : preset === "Small Size" ? "3" : "5",
          "-c:a",
          "libvorbis",
        );
        break;

      case "3GP":
        args.push(
          "-s",
          "352x288",
          "-r",
          "15",
          "-c:v",
          "h263",
          "-c:a",
          "amr_nb",
          "-ar",
          "8000",
          "-ac",
          "1",
        );
        break;

      default:
        args.push("-c:v", "libx264", "-preset", "ultrafast", "-crf", h264Crf);
        break;
    }

    // Apply explicit video bitrate override if specified
    if (customBitrate && advanced?.bitrate) {
      const bitVal = advanced.bitrate.replace(" ", "").toLowerCase();
      args.push("-b:v", bitVal);
    }

    // 6. Audio Quality & Sync
    if (outputFormat !== "3GP") {
      if (advanced?.audioQuality === "Mute Audio") {
        args.push("-an");
      } else {
        if (!args.includes("-c:a")) {
          args.push("-c:a", "aac");
        }
        if (advanced?.audioQuality?.includes("kbps")) {
          args.push("-b:a", advanced.audioQuality.replace(" ", ""));
        } else {
          let aBit = "128k";
          if (preset === "High Quality") aBit = "192k";
          else if (preset === "Small Size") aBit = "96k";
          args.push("-b:a", aBit);
        }
      }
    }

    // Overwrite output file
    args.push("-y", outputFilename);

    return args;
  }

  /**
   * Generate unique output filename preserving original filename and updating extension.
   * If output filename collides with an existing filename, appends (1), (2), (3)...
   */
  static getUniqueOutputFilename(
    originalFilename: string,
    outputFormat: SupportedOutputFormat,
    existingFilenames: string[] | Set<string> = [],
  ): string {
    const existingSet =
      existingFilenames instanceof Set ? existingFilenames : new Set(existingFilenames);

    // 1. Get base name without last extension
    const lastDotIndex = originalFilename.lastIndexOf(".");
    const baseName =
      lastDotIndex > 0 ? originalFilename.substring(0, lastDotIndex) : originalFilename;

    // 2. Format extension
    const targetExt = outputFormat.toLowerCase();

    // 3. Form initial candidate filename
    let candidate = `${baseName}.${targetExt}`;

    // 4. Append (1), (2), (3)... if already taken
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
   * Execute conversion using FFmpeg instance
   */
  static async convertVideo(
    ffmpeg: FFmpeg,
    inputFile: File,
    metadata: VideoMetadata,
    targetFormat: SupportedOutputFormat,
    advanced?: AdvancedSettings,
    onProgress?: (pct: number, timeSec: number) => void,
    existingFilenames?: string[] | Set<string>,
  ): Promise<{ outputData: Uint8Array; outputFilename: string }> {
    const inputExt = metadata.format ? metadata.format.toLowerCase() : "mp4";
    const inputVirtualName = `input_${Date.now()}_${Math.random().toString(36).substring(2, 6)}.${inputExt}`;

    const targetExt = targetFormat.toLowerCase();
    const outputVirtualName = `output_${Date.now()}_${Math.random().toString(36).substring(2, 6)}.${targetExt}`;

    const originalName = inputFile.name || metadata.filename || "video";
    const finalDownloadFilename = this.getUniqueOutputFilename(
      originalName,
      targetFormat,
      existingFilenames,
    );

    let lastProgressTime = 0;
    let lastPct = -1;

    const progressHandler = ({ progress, time }: { progress: number; time: number }) => {
      let pct = Math.round(progress * 100);
      if (pct > 99) pct = 99;

      // Fallback calculation using time / duration if progress isn't 0..1
      if ((isNaN(pct) || pct <= 0) && metadata.duration > 0 && time > 0) {
        const calculatedPct = Math.round((time / 1000000 / metadata.duration) * 100);
        pct = Math.min(99, Math.max(1, calculatedPct));
      }

      const now = typeof performance !== "undefined" ? performance.now() : Date.now();
      if (pct === 100 || now - lastProgressTime >= 100 || Math.abs(pct - lastPct) >= 2) {
        lastProgressTime = now;
        lastPct = pct;
        onProgress?.(pct, time ? time / 1000000 : 0);
      }
    };

    try {
      // 1. Write file to virtual filesystem
      await FFmpegService.writeFile(ffmpeg, inputVirtualName, inputFile);

      // 2. Setup progress listener
      ffmpeg.on("progress", progressHandler);

      // 3. Fast stream copy optimization if user hasn't changed custom filters
      let converted = false;
      const isDefaultSettings =
        (!advanced?.resolution || advanced.resolution === "Same as Original") &&
        (!advanced?.fps || advanced.fps === "Same as Original") &&
        (!advanced?.videoCodec || advanced.videoCodec.includes("Auto")) &&
        (!advanced?.bitrate || advanced.bitrate === "Auto") &&
        (!advanced?.audioQuality || advanced.audioQuality === "Auto");

      const streamCopyContainers = ["MP4", "MOV", "MKV", "M4V", "TS"];
      const isStreamCopyCandidate =
        isDefaultSettings &&
        streamCopyContainers.includes(inputExt.toUpperCase()) &&
        streamCopyContainers.includes(targetFormat);

      if (isStreamCopyCandidate) {
        try {
          const copyArgs = ["-i", inputVirtualName, "-c", "copy"];
          if (["MP4", "MOV", "M4V"].includes(targetFormat)) {
            copyArgs.push("-movflags", "+faststart");
          }
          copyArgs.push("-y", outputVirtualName);

          const copyExitCode = await ffmpeg.exec(copyArgs);
          if (copyExitCode === 0) {
            converted = true;
          }
        } catch {
          converted = false;
        }
      }

      // 4. Standard encoding if stream copy wasn't applicable or failed
      if (!converted) {
        const ffmpegArgs = this.buildFFmpegArgs({
          inputFilename: inputVirtualName,
          outputFilename: outputVirtualName,
          outputFormat: targetFormat,
          advanced,
        });

        const exitCode = await ffmpeg.exec(ffmpegArgs);
        if (exitCode !== 0) {
          throw new Error(`FFmpeg execution failed with exit code ${exitCode}.`);
        }
      }

      // 5. Read output binary
      const data = (await ffmpeg.readFile(outputVirtualName)) as Uint8Array;
      onProgress?.(100, metadata.duration);

      return {
        outputData: data,
        outputFilename: finalDownloadFilename,
      };
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Video conversion failed inside FFmpeg engine.";
      throw new Error(errorMessage);
    } finally {
      // Unbind progress listener & clean up virtual files in all cases
      ffmpeg.off("progress", progressHandler);
      await FFmpegService.safeDeleteFile(ffmpeg, inputVirtualName);
      await FFmpegService.safeDeleteFile(ffmpeg, outputVirtualName);
    }
  }
}
