import { FFmpeg } from "@ffmpeg/ffmpeg";
import { FFmpegService } from "./ffmpegService";
import { AdvancedSettings, SupportedOutputFormat, VideoMetadata } from "@/types/converter";

export interface ConversionArgsOptions {
  inputFilename: string;
  outputFilename: string;
  outputFormat: SupportedOutputFormat;
  advanced?: AdvancedSettings;
}

export class ConversionService {
  /**
   * Construct optimal FFmpeg command flags based on target format and advanced settings
   */
  static buildFFmpegArgs(opts: ConversionArgsOptions): string[] {
    const { inputFilename, outputFilename, outputFormat, advanced } = opts;
    const args: string[] = ["-i", inputFilename];

    // Check if Audio Only (MP3)
    if (outputFormat === "MP3") {
      args.push("-vn"); // No video
      if (advanced?.audioQuality === "Mute Audio") {
        args.push("-an");
      } else {
        const audioBitrate = advanced?.audioQuality?.includes("kbps")
          ? advanced.audioQuality.replace(" ", "")
          : "192k";
        args.push("-c:a", "libmp3lame", "-b:a", audioBitrate);
      }
      args.push("-y", outputFilename);
      return args;
    }

    // Check GIF
    if (outputFormat === "GIF") {
      const fps = advanced?.fps?.includes("FPS") ? parseInt(advanced.fps) : 12;
      let scaleFilter = "scale=480:-1:flags=lanczos";

      if (advanced?.resolution && advanced.resolution !== "Same as Original") {
        if (advanced.resolution.includes("720p")) scaleFilter = "scale=1280:-1";
        else if (advanced.resolution.includes("480p")) scaleFilter = "scale=854:-1";
        else if (advanced.resolution.includes("360p")) scaleFilter = "scale=640:-1";
      }

      args.push("-vf", `fps=${fps},${scaleFilter}`);
      args.push("-an"); // GIFs have no audio
      args.push("-y", outputFilename);
      return args;
    }

    // Filters array for resolution or FPS
    const videoFilters: string[] = [];

    // Resolution filter
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

    // Frame rate
    if (advanced?.fps && advanced.fps !== "Same as Original") {
      const fpsVal = parseInt(advanced.fps);
      if (!isNaN(fpsVal)) {
        args.push("-r", fpsVal.toString());
      }
    }

    // Format-specific codecs & presets
    switch (outputFormat) {
      case "MP4":
      case "M4V":
      case "MOV":
        args.push("-c:v", "libx264", "-preset", "ultrafast", "-pix_fmt", "yuv420p");
        break;
      case "WEBM":
        args.push("-c:v", "libvpx", "-b:v", "1M", "-c:a", "libvorbis");
        break;
      case "MKV":
        args.push("-c:v", "libx264", "-preset", "ultrafast");
        break;
      case "AVI":
        args.push("-c:v", "mpeg4", "-c:a", "mp3");
        break;
      case "WMV":
        args.push("-c:v", "wmv2", "-c:a", "wmav2");
        break;
      case "FLV":
        args.push("-c:v", "flv1", "-c:a", "mp3");
        break;
      case "MPEG":
        args.push("-c:v", "mpeg2video", "-c:a", "mp2");
        break;
      case "OGV":
        args.push("-c:v", "libtheora", "-c:a", "libvorbis");
        break;
      case "TS":
        args.push("-c:v", "libx264", "-preset", "ultrafast", "-f", "mpegts");
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
        args.push("-c:v", "libx264", "-preset", "ultrafast");
        break;
    }

    // Audio handling for video outputs
    if (outputFormat !== "3GP") {
      if (advanced?.audioQuality === "Mute Audio") {
        args.push("-an");
      } else {
        if (!args.includes("-c:a")) {
          args.push("-c:a", "aac");
        }
        if (advanced?.audioQuality?.includes("kbps")) {
          args.push("-b:a", advanced.audioQuality.replace(" ", ""));
        }
      }
    }

    // Bitrate override
    if (advanced?.bitrate && advanced.bitrate !== "Auto") {
      const bitVal = advanced.bitrate.replace(" ", "").toLowerCase();
      args.push("-b:v", bitVal);
    }

    // Overwrite output file
    args.push("-y", outputFilename);

    return args;
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
  ): Promise<{ outputData: Uint8Array; outputFilename: string }> {
    const inputExt = metadata.format.toLowerCase();
    const inputVirtualName = `input_${Date.now()}.${inputExt}`;

    const targetExt = targetFormat.toLowerCase();
    const baseName = metadata.filename.replace(/\.[^/.]+$/, "");
    const outputVirtualName = `output_${Date.now()}.${targetExt}`;
    const finalDownloadFilename = `${baseName}.${targetExt}`;

    try {
      // 1. Write file to virtual filesystem
      await FFmpegService.writeFile(ffmpeg, inputVirtualName, inputFile);

      // 2. Setup progress listener
      const progressHandler = ({ progress, time }: { progress: number; time: number }) => {
        let pct = Math.round(progress * 100);
        if (pct > 99) pct = 99;

        // Fallback calculation using time / duration if progress isn't 0..1
        if ((isNaN(pct) || pct <= 0) && metadata.duration > 0 && time > 0) {
          const calculatedPct = Math.round((time / 1000000 / metadata.duration) * 100);
          pct = Math.min(99, Math.max(1, calculatedPct));
        }

        onProgress?.(pct, time ? time / 1000000 : 0);
      };

      ffmpeg.on("progress", progressHandler);

      // 3. Build arguments
      const ffmpegArgs = this.buildFFmpegArgs({
        inputFilename: inputVirtualName,
        outputFilename: outputVirtualName,
        outputFormat: targetFormat,
        advanced,
      });

      console.log("Executing FFmpeg with args:", ffmpegArgs);

      // 4. Run command
      const exitCode = await ffmpeg.exec(ffmpegArgs);

      // Unbind progress listener
      ffmpeg.off("progress", progressHandler);

      if (exitCode !== 0) {
        throw new Error(`FFmpeg execution failed with exit code ${exitCode}.`);
      }

      // 5. Read output binary
      const data = (await ffmpeg.readFile(outputVirtualName)) as Uint8Array;

      // 6. Virtual filesystem cleanup
      await FFmpegService.safeDeleteFile(ffmpeg, inputVirtualName);
      await FFmpegService.safeDeleteFile(ffmpeg, outputVirtualName);

      onProgress?.(100, metadata.duration);

      return {
        outputData: data,
        outputFilename: finalDownloadFilename,
      };
    } catch (err: unknown) {
      // Cleanup on error
      await FFmpegService.safeDeleteFile(ffmpeg, inputVirtualName);
      await FFmpegService.safeDeleteFile(ffmpeg, outputVirtualName);
      const errorMessage =
        err instanceof Error ? err.message : "Video conversion failed inside FFmpeg engine.";
      throw new Error(errorMessage);
    }
  }
}
