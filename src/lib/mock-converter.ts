// Mock converter — swap this file with a real backend call later.
// The UI never touches ffmpeg or the network; everything is simulated.

export type ConvertOptions = {
  from: string;
  to: string;
  resolution: string;
  quality: string;
  codec: string;
  filename?: string;
};

export type ConvertResult = {
  url: string;
  filename: string;
};

export const LOADING_LINES = [
  "🎬 Negotiating with pixels...",
  "📼 Convincing AVI to become MP4...",
  "☕ Giving your video coffee...",
  "🚀 Compressing cinematic awesomeness...",
  "🐧 Asking FFmpeg nicely...",
  "🧃 Pouring extra smoothness...",
  "🧠 Thinking really hard...",
  "🎉 Almost done pretending...",
];

export function simulateConversion(
  opts: ConvertOptions,
  onProgress: (pct: number, label: string) => void,
  durationMs = 5200,
): Promise<ConvertResult> {
  return new Promise((resolve) => {
    const start = performance.now();
    let raf = 0;
    const tick = () => {
      const elapsed = performance.now() - start;
      const pct = Math.min(100, (elapsed / durationMs) * 100);
      const idx = Math.min(
        LOADING_LINES.length - 1,
        Math.floor((pct / 100) * LOADING_LINES.length),
      );
      onProgress(pct, LOADING_LINES[idx]);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        cancelAnimationFrame(raf);
        const base = (opts.filename ?? "masterpiece").replace(/\.[^.]+$/, "");
        resolve({
          url: "#",
          filename: `${base}.${opts.to.toLowerCase()}`,
        });
      }
    };
    raf = requestAnimationFrame(tick);
  });
}
