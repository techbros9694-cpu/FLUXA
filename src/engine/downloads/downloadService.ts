/**
 * VideoMorph Engine - Download Service
 * Universal service for Blob preparation, download URL generation, and file downloading.
 */

import { MemoryManager } from "../memory/memoryManager";

export class EngineDownloadService {
  /**
   * Get the correct MIME type for a given file extension
   */
  static getMimeType(format: string): string {
    const fmt = format.toLowerCase().replace(".", "");
    switch (fmt) {
      case "mp4":
      case "m4v":
        return "video/mp4";
      case "mov":
        return "video/quicktime";
      case "webm":
        return "video/webm";
      case "mkv":
        return "video/x-matroska";
      case "avi":
        return "video/x-msvideo";
      case "wmv":
        return "video/x-ms-wmv";
      case "flv":
        return "video/x-flv";
      case "ts":
        return "video/mp2t";
      case "mp3":
        return "audio/mpeg";
      case "wav":
        return "audio/wav";
      case "aac":
        return "audio/aac";
      case "flac":
        return "audio/flac";
      case "ogg":
        return "audio/ogg";
      case "m4a":
        return "audio/mp4";
      case "gif":
        return "image/gif";
      default:
        return "application/octet-stream";
    }
  }

  /**
   * Create a downloadable Blob URL and register it with the MemoryManager
   */
  static createDownloadUrl(data: Uint8Array | Blob, format: string): { url: string; blob: Blob } {
    const mimeType = this.getMimeType(format);
    const blob =
      data instanceof Blob ? data : new Blob([data.buffer as ArrayBuffer], { type: mimeType });
    const url = URL.createObjectURL(blob);
    MemoryManager.registerUrl(url);
    return { url, blob };
  }

  /**
   * Trigger an automatic browser file download
   */
  static triggerDownload(url: string, filename: string): void {
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
    }, 100);
  }

  /**
   * Generate clean formatted output filename
   */
  static generateOutputFilename(
    originalFilename: string,
    targetFormat: string,
    prefix?: string,
  ): string {
    const baseName =
      originalFilename.substring(0, originalFilename.lastIndexOf(".")) || originalFilename;
    const cleanExt = targetFormat.toLowerCase().replace(".", "");
    const tag = prefix ? `_${prefix}` : "_videomorph";
    return `${baseName}${tag}.${cleanExt}`;
  }
}
