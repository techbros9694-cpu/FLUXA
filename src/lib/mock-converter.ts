// Mock converter — swap this file with a real backend call later.
// The UI never touches ffmpeg or the network; everything is simulated.

export type DetectedMetadata = {
  filename: string;
  format: string;
  sizeFormatted: string;
  sizeInBytes: number;
  resolution: string;
  duration: string;
  videoCodec: string;
  audioCodec: string;
  fps: string;
};

export type ConvertOptions = {
  from: string;
  to: string;
  resolution?: string;
  quality?: string;
  codec?: string;
  bitrate?: string;
  fps?: string;
  audioQuality?: string;
  filename?: string;
  sizeInBytes?: number;
};

export type ConvertResult = {
  url: string;
  filename: string;
  originalSizeFormatted: string;
  outputSizeFormatted: string;
};

export const FUNNY_LOADING_LINES = [
  "🎬 Negotiating with pixels...",
  "📼 Teaching MOV how to become MP4...",
  "🐧 Convincing FFmpeg politely...",
  "🚀 Compressing cinematic greatness...",
  "🧃 Pouring extra smoothness...",
  "☕ Giving your video coffee...",
  "🧠 Thinking really hard...",
  "🎉 Almost there...",
];

export const LOADING_LINES = FUNNY_LOADING_LINES;

export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

export function detectFileMetadata(file?: File | null): DetectedMetadata {
  if (!file) {
    return {
      filename: "Vacation.mov",
      format: "MOV",
      sizeFormatted: "248 MB",
      sizeInBytes: 248 * 1024 * 1024,
      resolution: "1920×1080",
      duration: "02:43",
      videoCodec: "H.264",
      audioCodec: "AAC",
      fps: "30 FPS",
    };
  }

  const ext = file.name.split(".").pop()?.toUpperCase() || "MOV";
  const sizeBytes = file.size || 248 * 1024 * 1024;

  // Default estimates based on extension
  const codecMap: Record<string, { video: string; audio: string }> = {
    MOV: { video: "H.264 / ProRes", audio: "AAC" },
    MP4: { video: "H.264", audio: "AAC" },
    MKV: { video: "H.265 / HEVC", audio: "AC3" },
    WEBM: { video: "VP9", audio: "Opus" },
    AVI: { video: "MPEG-4", audio: "MP3" },
    GIF: { video: "GIF Palette", audio: "None" },
  };

  const codecs = codecMap[ext] || { video: "H.264", audio: "AAC" };

  return {
    filename: file.name,
    format: ext,
    sizeFormatted: formatBytes(sizeBytes),
    sizeInBytes: sizeBytes,
    resolution: "1920×1080",
    duration: "02:43",
    videoCodec: codecs.video,
    audioCodec: codecs.audio,
    fps: "30 FPS",
  };
}

export function calculateEstimatedSize(sizeInBytes: number, targetFormat: string): string {
  const multipliers: Record<string, number> = {
    MP4: 0.88,
    WEBM: 0.56,
    MKV: 0.94,
    MOV: 1.05,
    AVI: 1.15,
    GIF: 0.35,
    MP3: 0.08,
  };
  const mult = multipliers[targetFormat.toUpperCase()] || 0.85;
  const estimatedBytes = Math.round(sizeInBytes * mult);
  return formatBytes(estimatedBytes);
}

export function simulateConversion(
  opts: ConvertOptions,
  onProgress: (pct: number, label: string) => void,
  durationMs = 4500,
): Promise<ConvertResult> {
  return new Promise((resolve) => {
    const start = performance.now();
    let raf = 0;

    // Customize funny lines with target format
    const lines = [
      "🎬 Negotiating with pixels...",
      `📼 Teaching ${opts.from || "video"} how to become ${opts.to}...`,
      "🐧 Convincing FFmpeg politely...",
      "🚀 Compressing cinematic greatness...",
      "🧃 Pouring extra smoothness...",
      "🧠 Thinking really hard...",
      "🎉 Almost there...",
    ];

    const tick = () => {
      const elapsed = performance.now() - start;
      const pct = Math.min(100, (elapsed / durationMs) * 100);
      const idx = Math.min(lines.length - 1, Math.floor((pct / 100) * lines.length));
      onProgress(pct, lines[idx]);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        cancelAnimationFrame(raf);
        const base = (opts.filename ?? "Vacation.mov").replace(/\.[^.]+$/, "");
        const origSize = opts.sizeInBytes || 248 * 1024 * 1024;
        resolve({
          url: "#",
          filename: `${base}.${opts.to.toLowerCase()}`,
          originalSizeFormatted: formatBytes(origSize),
          outputSizeFormatted: calculateEstimatedSize(origSize, opts.to),
        });
      }
    };
    raf = requestAnimationFrame(tick);
  });
}
