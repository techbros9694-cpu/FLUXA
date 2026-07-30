import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

export class FFmpegService {
  private static instance: FFmpeg | null = null;
  private static loadingPromise: Promise<FFmpeg> | null = null;
  private static isLoaded = false;

  /**
   * Get or initialize the singleton FFmpeg instance.
   * Loads WASM files lazily on demand.
   */
  static async getInstance(
    onLog?: (msg: string) => void,
    onLoadProgress?: (msg: string) => void,
  ): Promise<FFmpeg> {
    if (this.instance && this.isLoaded) {
      return this.instance;
    }

    if (this.loadingPromise) {
      return this.loadingPromise;
    }

    this.loadingPromise = (async () => {
      try {
        onLoadProgress?.("Loading FFmpeg WebAssembly engine...");
        const ffmpeg = new FFmpeg();

        if (onLog) {
          ffmpeg.on("log", ({ message }) => {
            onLog(message);
          });
        }

        // Use core v0.12.6 single-threaded build from unpkg / jsdelivr
        // Single-threaded core runs safely in all browsers without requiring COOP/COEP headers
        const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm";

        onLoadProgress?.("Downloading WASM binaries...");
        const coreURL = await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript");
        const wasmURL = await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm");

        onLoadProgress?.("Initializing conversion worker...");
        await ffmpeg.load({
          coreURL,
          wasmURL,
        });

        this.instance = ffmpeg;
        this.isLoaded = true;
        onLoadProgress?.("FFmpeg Engine Ready!");
        return ffmpeg;
      } catch (err: unknown) {
        this.loadingPromise = null;
        this.isLoaded = false;
        console.error("Failed to load FFmpeg.wasm:", err);
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to load FFmpeg in your browser. Please ensure your browser supports WebAssembly.";
        throw new Error(errorMessage);
      }
    })();

    return this.loadingPromise;
  }

  /**
   * Check if FFmpeg is currently loaded
   */
  static isEngineLoaded(): boolean {
    return this.isLoaded && this.instance !== null;
  }

  /**
   * Helper to write a File or Uint8Array to FFmpeg virtual filesystem
   */
  static async writeFile(
    ffmpeg: FFmpeg,
    name: string,
    fileOrData: File | Uint8Array | string,
  ): Promise<void> {
    if (fileOrData instanceof File) {
      const data = await fetchFile(fileOrData);
      await ffmpeg.writeFile(name, data);
    } else {
      await ffmpeg.writeFile(name, fileOrData);
    }
  }

  /**
   * Clean up virtual filesystem file safely
   */
  static async safeDeleteFile(ffmpeg: FFmpeg, name: string): Promise<void> {
    try {
      await ffmpeg.deleteFile(name);
    } catch {
      // Ignore if file doesn't exist
    }
  }
}
