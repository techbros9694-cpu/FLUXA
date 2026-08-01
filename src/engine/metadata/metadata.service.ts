/**
 * VideoMorph Engine - Metadata Service
 * Single unified service for media stream analysis and metadata extraction.
 */

import { MediaMetadata } from "../types/engine.types";

export class EngineMetadataService {
  /**
   * Extract metadata from an uploaded File using HTML5 Media Elements & FFmpeg probe hints
   */
  static async extractMetadata(file: File): Promise<MediaMetadata> {
    const isAudio =
      file.type.startsWith("audio/") || /\.(mp3|wav|flac|aac|ogg|m4a)$/i.test(file.name);
    const isVideo =
      file.type.startsWith("video/") ||
      /\.(mp4|mov|mkv|webm|avi|flv|wmv|3gp|ts|m4v|gif)$/i.test(file.name);

    let duration = 0;
    let width: number | undefined = undefined;
    let height: number | undefined = undefined;
    let resolution: string | undefined = undefined;

    if (isVideo) {
      try {
        const videoMeta = await this.probeVideoElement(file);
        duration = videoMeta.duration;
        width = videoMeta.width;
        height = videoMeta.height;
        resolution = `${width}x${height}`;
      } catch {
        // Fallback or safe defaults if element probing is blocked
      }
    } else if (isAudio) {
      try {
        duration = await this.probeAudioElement(file);
      } catch {
        // Fallback
      }
    }

    const extension = file.name.split(".").pop()?.toUpperCase() || "UNKNOWN";

    return {
      filename: file.name,
      filesize: file.size,
      format: extension,
      container: extension,
      videoCodec: isVideo ? this.guessVideoCodec(extension) : undefined,
      audioCodec: isAudio || isVideo ? this.guessAudioCodec(extension) : undefined,
      width,
      height,
      resolution,
      fps: isVideo ? 30 : undefined,
      duration,
      bitrate: duration > 0 ? Math.round((file.size * 8) / duration) : undefined,
      hasVideo: isVideo,
      hasAudio: isAudio || isVideo,
    };
  }

  private static probeVideoElement(
    file: File,
  ): Promise<{ width: number; height: number; duration: number }> {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      video.preload = "metadata";
      const url = URL.createObjectURL(file);

      video.onloadedmetadata = () => {
        const result = {
          width: video.videoWidth || 1920,
          height: video.videoHeight || 1080,
          duration: isFinite(video.duration) ? video.duration : 0,
        };
        URL.revokeObjectURL(url);
        resolve(result);
      };

      video.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error("Failed to load video element metadata"));
      };

      video.src = url;
    });
  }

  private static probeAudioElement(file: File): Promise<number> {
    return new Promise((resolve, reject) => {
      const audio = document.createElement("audio");
      audio.preload = "metadata";
      const url = URL.createObjectURL(file);

      audio.onloadedmetadata = () => {
        const duration = isFinite(audio.duration) ? audio.duration : 0;
        URL.revokeObjectURL(url);
        resolve(duration);
      };

      audio.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error("Failed to load audio element metadata"));
      };

      audio.src = url;
    });
  }

  private static guessVideoCodec(ext: string): string {
    switch (ext) {
      case "MP4":
      case "MOV":
      case "M4V":
        return "h264";
      case "WEBM":
        return "vp9";
      case "MKV":
        return "h264";
      case "AVI":
        return "mpeg4";
      case "WMV":
        return "wmv2";
      case "GIF":
        return "gif";
      default:
        return "h264";
    }
  }

  private static guessAudioCodec(ext: string): string {
    switch (ext) {
      case "MP3":
        return "mp3";
      case "WEBM":
        return "opus";
      case "FLAC":
        return "flac";
      case "WAV":
        return "pcm";
      case "OGG":
        return "vorbis";
      default:
        return "aac";
    }
  }
}
