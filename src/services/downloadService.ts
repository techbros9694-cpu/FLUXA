import { SupportedOutputFormat } from "@/types/converter";

export class DownloadService {
  /**
   * Map format extension to MIME type
   */
  static getMimeType(format: SupportedOutputFormat): string {
    const mimeMap: Record<SupportedOutputFormat, string> = {
      MP4: "video/mp4",
      MOV: "video/quicktime",
      MKV: "video/x-matroska",
      AVI: "video/x-msvideo",
      WEBM: "video/webm",
      WMV: "video/x-ms-wmv",
      FLV: "video/x-flv",
      MPEG: "video/mpeg",
      M4V: "video/x-m4v",
      OGV: "video/ogg",
      TS: "video/mp2t",
      "3GP": "video/3gpp",
      GIF: "image/gif",
      MP3: "audio/mpeg",
    };
    return mimeMap[format] || "application/octet-stream";
  }

  /**
   * Create downloadable Blob & Object URL from binary data
   */
  static createDownloadUrl(
    data: Uint8Array,
    format: SupportedOutputFormat,
  ): { blob: Blob; url: string } {
    const mimeType = this.getMimeType(format);
    const blob = new Blob([data.buffer as ArrayBuffer], { type: mimeType });
    const url = URL.createObjectURL(blob);
    return { blob, url };
  }

  /**
   * Trigger native browser download directly from memory
   */
  static triggerDownload(url: string, filename: string): void {
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  /**
   * Download all results as a single ZIP archive
   */
  static async downloadAllAsZip(
    results: { filename: string; blob: Blob }[],
    zipFilename = "videomorph-converted-videos.zip",
  ): Promise<void> {
    const { default: JSZip } = await import("jszip");
    const zip = new JSZip();
    for (const item of results) {
      zip.file(item.filename, item.blob);
    }
    const zipBlob = await zip.generateAsync({ type: "blob" });
    const zipUrl = URL.createObjectURL(zipBlob);
    this.triggerDownload(zipUrl, zipFilename);
    setTimeout(() => this.revokeUrl(zipUrl), 10000);
  }

  /**
   * Safely revoke object URL to prevent memory leaks
   */
  static revokeUrl(url: string): void {
    if (url && url.startsWith("blob:")) {
      URL.revokeObjectURL(url);
    }
  }
}
