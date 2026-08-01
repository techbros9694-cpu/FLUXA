/**
 * VideoMorph Engine - Central FFmpeg Command Builder
 * Generates quality-preserving FFmpeg arguments for all platform media operations.
 */

import {
  AnyEngineOperationOptions,
  EngineAdvancedSettings,
  ProcessingStrategy,
} from "../types/engine.types";
import { getProfile } from "../profiles/quality.profiles";

export class FFmpegCommandBuilder {
  /**
   * Main entry point: build FFmpeg arguments based on operation and strategy
   */
  static buildCommand(
    options: AnyEngineOperationOptions,
    inputVirtualNames: string[],
    outputVirtualName: string,
    strategy: ProcessingStrategy,
  ): string[] {
    const mainInput = inputVirtualNames[0] || "input_0.mp4";

    switch (options.operation) {
      case "convert":
        return this.buildConvertCommand(
          mainInput,
          outputVirtualName,
          options.outputFormat,
          options.advancedSettings,
          strategy,
        );

      case "compress":
        return this.buildCompressCommand(
          mainInput,
          outputVirtualName,
          options.outputFormat,
          options.targetSizeMB,
          options.advancedSettings,
        );

      case "trim":
        return this.buildTrimCommand(
          mainInput,
          outputVirtualName,
          options.startTimeSeconds,
          options.endTimeSeconds,
          options.outputFormat,
          strategy,
        );

      case "merge":
        return this.buildMergeCommand(inputVirtualNames, outputVirtualName, options.outputFormat);

      case "extract-audio":
        return this.buildExtractAudioCommand(
          mainInput,
          outputVirtualName,
          options.audioFormat,
          options.audioBitrate,
        );

      case "gif":
        return this.buildGifCommand(
          mainInput,
          outputVirtualName,
          options.fps || 15,
          options.scaleWidth,
        );

      case "gif-to-video":
        return this.buildGifToVideoCommand(
          mainInput,
          outputVirtualName,
          options.targetVideoFormat || "MP4",
        );

      case "resize":
        return this.buildResizeCommand(
          mainInput,
          outputVirtualName,
          options.targetWidth,
          options.targetHeight,
          options.outputFormat,
        );

      case "rotate":
        return this.buildRotateCommand(
          mainInput,
          outputVirtualName,
          options.degrees,
          options.outputFormat,
        );

      case "fps":
        return this.buildFpsCommand(
          mainInput,
          outputVirtualName,
          options.targetFps,
          options.outputFormat,
        );

      case "audio-convert":
      case "audio-compress":
      case "audio-trim":
        return this.buildAudioCommand(
          mainInput,
          outputVirtualName,
          options.outputFormat,
          options.targetBitrate,
          options.startTimeSeconds,
          options.endTimeSeconds,
        );

      default:
        return [
          "-i",
          mainInput,
          "-c:v",
          "libx264",
          "-preset",
          "fast",
          "-crf",
          "19",
          "-c:a",
          "aac",
          "-b:a",
          "192k",
          "-y",
          outputVirtualName,
        ];
    }
  }

  /**
   * Video Format Conversion Command
   */
  private static buildConvertCommand(
    inputFilename: string,
    outputFilename: string,
    outputFormat: string,
    advanced?: EngineAdvancedSettings,
    strategy?: ProcessingStrategy,
  ): string[] {
    const args: string[] = ["-i", inputFilename];

    // Check if Stream Copy is applicable
    if (strategy?.isStreamCopy) {
      args.push("-c", "copy", "-y", outputFilename);
      return args;
    }

    const preset = advanced?.qualityPreset || "Balanced";
    const profile = getProfile(outputFormat, preset);

    // Audio-only format (MP3, AAC, FLAC, WAV)
    if (outputFormat === "MP3") {
      let audioBitrate = "256k";
      if (advanced?.audioQuality?.includes("kbps")) {
        audioBitrate = advanced.audioQuality.replace(" ", "");
      }
      args.push("-vn", "-c:a", "libmp3lame", "-b:a", audioBitrate, "-y", outputFilename);
      return args;
    }

    // GIF
    if (outputFormat === "GIF") {
      return this.buildGifCommand(inputFilename, outputFilename, 15);
    }

    // Filters
    const videoFilters: string[] = [];
    if (advanced?.resolution && advanced.resolution !== "Same as Original") {
      if (advanced.resolution.includes("1080p")) videoFilters.push("scale=1920:-2");
      else if (advanced.resolution.includes("720p")) videoFilters.push("scale=1280:-2");
      else if (advanced.resolution.includes("480p")) videoFilters.push("scale=854:-2");
      else if (advanced.resolution.includes("360p")) videoFilters.push("scale=640:-2");
    } else {
      videoFilters.push("scale=trunc(iw/2)*2:trunc(ih/2)*2");
    }

    if (advanced?.rotation) {
      if (advanced.rotation === 90) videoFilters.push("transpose=1");
      if (advanced.rotation === 180) videoFilters.push("transpose=2,transpose=2");
      if (advanced.rotation === 270) videoFilters.push("transpose=2");
    }

    if (videoFilters.length > 0) {
      args.push("-vf", videoFilters.join(","));
    }

    // FPS
    if (advanced?.fps && advanced.fps !== "Same as Original") {
      const fpsVal = parseInt(advanced.fps, 10);
      if (!isNaN(fpsVal)) {
        args.push("-r", fpsVal.toString());
      }
    }

    // Codec & Quality settings
    const fmt = outputFormat.toUpperCase();
    if (fmt === "WEBM") {
      args.push(
        "-c:v",
        "libvpx-vp9",
        "-deadline",
        profile.deadline || "good",
        "-cpu-used",
        (profile.cpuUsed ?? 2).toString(),
        "-crf",
        profile.crf.toString(),
        "-b:v",
        "0",
        "-pix_fmt",
        "yuv420p",
        "-tile-columns",
        "2",
        "-row-mt",
        "1",
        "-c:a",
        "libopus",
        "-b:a",
        "192k",
      );
    } else if (fmt === "AVI") {
      args.push("-c:v", "mpeg4", "-q:v", "3", "-c:a", "mp3", "-b:a", "192k");
    } else if (fmt === "WMV") {
      args.push("-c:v", "wmv2", "-q:v", "3", "-c:a", "wmav2", "-b:a", "192k");
    } else {
      // H.264 default (MP4, MOV, MKV, TS)
      args.push(
        "-c:v",
        profile.codec,
        "-preset",
        profile.preset,
        "-crf",
        profile.crf.toString(),
        "-pix_fmt",
        profile.pixelFormat || "yuv420p",
      );

      if (advanced?.audioQuality === "Mute Audio") {
        args.push("-an");
      } else {
        args.push("-c:a", profile.defaultAudioCodec, "-b:a", profile.defaultAudioBitrate);
      }
    }

    args.push("-y", outputFilename);
    return args;
  }

  /**
   * Video Compression Command (Preserves quality while targeting file size if requested)
   */
  private static buildCompressCommand(
    inputFilename: string,
    outputFilename: string,
    outputFormat: string,
    targetSizeMB?: number,
    advanced?: EngineAdvancedSettings,
  ): string[] {
    const args: string[] = ["-i", inputFilename];
    const crf = advanced?.crfOverride || (targetSizeMB ? 24 : 22);

    args.push(
      "-vf",
      "scale=trunc(iw/2)*2:trunc(ih/2)*2",
      "-c:v",
      "libx264",
      "-preset",
      "medium",
      "-crf",
      crf.toString(),
      "-pix_fmt",
      "yuv420p",
      "-c:a",
      "aac",
      "-b:a",
      "128k",
      "-y",
      outputFilename,
    );

    return args;
  }

  /**
   * Video Trimmer Command
   */
  private static buildTrimCommand(
    inputFilename: string,
    outputFilename: string,
    startTimeSeconds: number,
    endTimeSeconds: number,
    outputFormat: string,
    strategy?: ProcessingStrategy,
  ): string[] {
    const args: string[] = [];

    if (startTimeSeconds > 0) {
      args.push("-ss", startTimeSeconds.toString());
    }

    args.push("-i", inputFilename);

    if (endTimeSeconds > startTimeSeconds) {
      args.push("-to", endTimeSeconds.toString());
    }

    if (strategy?.isStreamCopy) {
      args.push("-c", "copy");
    } else {
      args.push("-c:v", "libx264", "-preset", "fast", "-crf", "19", "-c:a", "aac", "-b:a", "192k");
    }

    args.push("-y", outputFilename);
    return args;
  }

  /**
   * Video Merge / Concatenation Command
   */
  private static buildMergeCommand(
    inputFilenames: string[],
    outputFilename: string,
    outputFormat: string,
  ): string[] {
    const args: string[] = [];
    inputFilenames.forEach((fn) => {
      args.push("-i", fn);
    });

    const filterComplex =
      inputFilenames.map((_, idx) => `[${idx}:v][${idx}:a]`).join("") +
      `concat=n=${inputFilenames.length}:v=1:a=1[v][a]`;

    args.push(
      "-filter_complex",
      filterComplex,
      "-map",
      "[v]",
      "-map",
      "[a]",
      "-c:v",
      "libx264",
      "-preset",
      "fast",
      "-crf",
      "19",
      "-c:a",
      "aac",
      "-b:a",
      "192k",
      "-y",
      outputFilename,
    );

    return args;
  }

  /**
   * Extract Audio Command
   */
  private static buildExtractAudioCommand(
    inputFilename: string,
    outputFilename: string,
    audioFormat: string,
    audioBitrate: string = "256k",
  ): string[] {
    const fmt = audioFormat.toUpperCase();
    const args: string[] = ["-i", inputFilename, "-vn"];

    switch (fmt) {
      case "MP3":
        args.push("-c:a", "libmp3lame", "-b:a", audioBitrate);
        break;
      case "AAC":
      case "M4A":
        args.push("-c:a", "aac", "-b:a", audioBitrate);
        break;
      case "WAV":
        args.push("-c:a", "pcm_s16le");
        break;
      case "FLAC":
        args.push("-c:a", "flac");
        break;
      case "OGG":
        args.push("-c:a", "libvorbis", "-b:a", audioBitrate);
        break;
      case "OPUS":
        args.push("-c:a", "libopus", "-b:a", audioBitrate);
        break;
      default:
        args.push("-c:a", "libmp3lame", "-b:a", "256k");
        break;
    }

    args.push("-y", outputFilename);
    return args;
  }

  /**
   * Video to GIF Command
   */
  private static buildGifCommand(
    inputFilename: string,
    outputFilename: string,
    fps: number = 15,
    scaleWidth?: number,
  ): string[] {
    const scaleFilter = scaleWidth
      ? `scale=${scaleWidth}:-1:flags=lanczos`
      : "scale=trunc(iw/2)*2:trunc(ih/2)*2:flags=lanczos";

    return ["-i", inputFilename, "-vf", `fps=${fps},${scaleFilter}`, "-an", "-y", outputFilename];
  }

  /**
   * GIF to Video Command
   */
  private static buildGifToVideoCommand(
    inputFilename: string,
    outputFilename: string,
    targetFormat: string = "MP4",
  ): string[] {
    return [
      "-i",
      inputFilename,
      "-vf",
      "scale=trunc(iw/2)*2:trunc(ih/2)*2",
      "-c:v",
      "libx264",
      "-pix_fmt",
      "yuv420p",
      "-crf",
      "19",
      "-preset",
      "fast",
      "-y",
      outputFilename,
    ];
  }

  /**
   * Resize Video Command
   */
  private static buildResizeCommand(
    inputFilename: string,
    outputFilename: string,
    width: number,
    height: number,
    outputFormat: string,
  ): string[] {
    return [
      "-i",
      inputFilename,
      "-vf",
      `scale=${width}:${height}`,
      "-c:v",
      "libx264",
      "-preset",
      "fast",
      "-crf",
      "19",
      "-c:a",
      "copy",
      "-y",
      outputFilename,
    ];
  }

  /**
   * Rotate Video Command
   */
  private static buildRotateCommand(
    inputFilename: string,
    outputFilename: string,
    degrees: 90 | 180 | 270,
    outputFormat: string,
  ): string[] {
    let transpose = "transpose=1";
    if (degrees === 180) transpose = "transpose=2,transpose=2";
    if (degrees === 270) transpose = "transpose=2";

    return [
      "-i",
      inputFilename,
      "-vf",
      transpose,
      "-c:v",
      "libx264",
      "-preset",
      "fast",
      "-crf",
      "19",
      "-c:a",
      "copy",
      "-y",
      outputFilename,
    ];
  }

  /**
   * Change Frame Rate Command
   */
  private static buildFpsCommand(
    inputFilename: string,
    outputFilename: string,
    targetFps: number,
    outputFormat: string,
  ): string[] {
    return [
      "-i",
      inputFilename,
      "-r",
      targetFps.toString(),
      "-c:v",
      "libx264",
      "-preset",
      "fast",
      "-crf",
      "19",
      "-c:a",
      "copy",
      "-y",
      outputFilename,
    ];
  }

  /**
   * Audio Convert / Compress / Trim Command
   */
  private static buildAudioCommand(
    inputFilename: string,
    outputFilename: string,
    outputFormat: string,
    bitrate: string = "256k",
    startTimeSeconds?: number,
    endTimeSeconds?: number,
  ): string[] {
    const args: string[] = [];

    if (startTimeSeconds && startTimeSeconds > 0) {
      args.push("-ss", startTimeSeconds.toString());
    }

    args.push("-i", inputFilename, "-vn");

    if (endTimeSeconds && endTimeSeconds > (startTimeSeconds || 0)) {
      args.push("-to", endTimeSeconds.toString());
    }

    const fmt = outputFormat.toUpperCase();
    if (fmt === "MP3") {
      args.push("-c:a", "libmp3lame", "-b:a", bitrate);
    } else if (fmt === "AAC" || fmt === "M4A") {
      args.push("-c:a", "aac", "-b:a", bitrate);
    } else if (fmt === "WAV") {
      args.push("-c:a", "pcm_s16le");
    } else if (fmt === "FLAC") {
      args.push("-c:a", "flac");
    } else if (fmt === "OGG") {
      args.push("-c:a", "libvorbis", "-b:a", bitrate);
    } else if (fmt === "OPUS") {
      args.push("-c:a", "libopus", "-b:a", bitrate);
    } else {
      args.push("-c:a", "libmp3lame", "-b:a", "256k");
    }

    args.push("-y", outputFilename);
    return args;
  }
}
