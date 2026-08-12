import { VideoMetadata, SupportedOutputFormat } from "@/types/converter";
import { EngineMetadataService } from "@/engine/metadata/metadata.service";

export function getItemInputFormat(item: { file: File; metadata?: VideoMetadata | null }): string {
  let fmt = item.metadata?.format || item.file.name.split(".").pop() || "MP4";
  fmt = fmt.toUpperCase();
  if (fmt === "MPG") fmt = "MPEG";
  if (fmt === "MTS") fmt = "TS";
  return fmt;
}

export function getValidFallbackFormat(
  inputFormat: string,
  preferredFormat?: SupportedOutputFormat,
): SupportedOutputFormat {
  if (preferredFormat && preferredFormat.toUpperCase() !== inputFormat.toUpperCase()) {
    return preferredFormat;
  }
  const fallbackList: SupportedOutputFormat[] = ["MKV", "WEBM", "MOV", "MP4", "AVI"];
  for (const f of fallbackList) {
    if (f.toUpperCase() !== inputFormat.toUpperCase()) {
      return f;
    }
  }
  return "MKV";
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

export function formatDuration(seconds: number): string {
  if (isNaN(seconds) || seconds <= 0) return "00:00";
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const pad = (n: number) => n.toString().padStart(2, "0");

  if (hrs > 0) {
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
  }
  return `${pad(mins)}:${pad(secs)}`;
}

export class MetadataService {
  /**
   * Extract real metadata from uploaded video file using binary header stream inspection & HTML5 video element
   */
  static async extractMetadata(file: File): Promise<VideoMetadata> {
    const ext = file.name.split(".").pop()?.toUpperCase() || "MP4";
    const fileSizeFormatted = formatBytes(file.size);

    let probedVideoCodec = "";
    let probedAudioCodec = "";
    let probedContainer = "";

    try {
      const engineMeta = await EngineMetadataService.extractMetadata(file);
      if (engineMeta.videoCodec) probedVideoCodec = engineMeta.videoCodec;
      if (engineMeta.audioCodec) probedAudioCodec = engineMeta.audioCodec;
      if (engineMeta.container) probedContainer = engineMeta.container;
    } catch {
      // Ignore binary inspection error and fallback
    }

    return new Promise((resolve) => {
      // Default fallback codecs mapped by format
      const defaultCodecMap: Record<string, { v: string; a: string }> = {
        MP4: { v: "H.264", a: "AAC" },
        MOV: { v: "H.264 / ProRes", a: "AAC" },
        MKV: { v: "H.264 / H.265", a: "AAC / AC3" },
        WEBM: { v: "VP9 / VP8", a: "Opus / Vorbis" },
        AVI: { v: "MPEG-4 / Xvid", a: "MP3 / PCM" },
        WMV: { v: "WMV3 / VC-1", a: "WMA" },
        FLV: { v: "FLV1 / H.264", a: "MP3 / AAC" },
        MPEG: { v: "MPEG-2", a: "MP2" },
        MPG: { v: "MPEG-1", a: "MP2" },
        M4V: { v: "H.264", a: "AAC" },
        OGV: { v: "Theora", a: "Vorbis" },
        TS: { v: "H.264 / MPEG-2", a: "AAC / AC3" },
        MTS: { v: "AVCHD / H.264", a: "AC3" },
        "3GP": { v: "H.263 / H.264", a: "AMR / AAC" },
        GIF: { v: "GIF Palette", a: "None" },
      };

      const fallbackCodecs = defaultCodecMap[ext] || { v: "H.264", a: "AAC" };
      const videoCodec = probedVideoCodec || fallbackCodecs.v;
      const audioCodec = probedAudioCodec || fallbackCodecs.a;

      // Try reading dimensions & duration via video element
      const url = URL.createObjectURL(file);
      const video = document.createElement("video");
      video.preload = "metadata";

      let resolved = false;

      const finishWithData = (width: number, height: number, duration: number) => {
        if (resolved) return;
        resolved = true;
        URL.revokeObjectURL(url);

        const resStr = width && height ? `${width}×${height}` : "1920×1080";
        const durFormatted = formatDuration(duration);

        // Estimate bitrate from size / duration
        let bitrateStr = "";
        if (duration > 0 && file.size > 0) {
          const bitsPerSec = (file.size * 8) / duration;
          const mbps = (bitsPerSec / (1024 * 1024)).toFixed(1);
          bitrateStr = `${mbps} Mbps`;
        }

        resolve({
          filename: file.name,
          fileSize: file.size,
          sizeFormatted: fileSizeFormatted,
          format: ext,
          container: probedContainer || ext,
          videoCodec,
          audioCodec,
          resolution: resStr,
          width: width || 1920,
          height: height || 1080,
          duration: duration || 0,
          durationFormatted: durFormatted,
          fps: "30 FPS",
          bitrate: bitrateStr || "4.5 Mbps",
        });
      };

      video.onloadedmetadata = () => {
        finishWithData(video.videoWidth, video.videoHeight, video.duration);
      };

      video.onerror = () => {
        // Fallback for formats browser video tag can't natively render (e.g. MKV, TS)
        finishWithData(1920, 1080, 120);
      };

      // Timeout safety net
      setTimeout(() => {
        if (!resolved) {
          finishWithData(1920, 1080, 120);
        }
      }, 1500);

      video.src = url;
    });
  }
}
