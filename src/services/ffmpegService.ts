import { SupportedOutputFormat, AdvancedSettings, VideoMetadata } from "@/types/converter";
import { PerformanceService, DevicePerformanceProfile } from "./performanceService";

export interface WorkerProgressPayload {
  pct: number;
  elapsedSec: number;
  remainingSec: number;
  timeSec: number;
  stage: string;
  fps?: number;
  speed?: string;
  throughputMBs?: number;
  conversionType?: "Stream Copy" | "Full Re-Encode";
  explanation?: string;
  threads?: number;
}

export class FFmpegService {
  private static worker: Worker | null = null;
  private static initPromise: Promise<void> | null = null;
  private static activeCallbacks: Map<
    string,
    {
      resolve: (data: {
        outputBuffer: ArrayBuffer;
        outputFilename: string;
        conversionType?: "Stream Copy" | "Full Re-Encode";
        explanation?: string;
      }) => void;
      reject: (reason: Error) => void;
      onProgress?: (progress: WorkerProgressPayload) => void;
    }
  > = new Map();

  /**
   * Initialize worker instance lazily once and keep alive
   */
  private static getWorker(): Worker {
    if (typeof window === "undefined" || typeof Worker === "undefined") {
      throw new Error("Web Workers are not supported in this environment.");
    }

    if (!this.worker) {
      this.worker = new Worker(new URL("../workers/ffmpeg.worker.ts", import.meta.url), {
        type: "module",
      });

      this.worker.onmessage = (event: MessageEvent) => {
        const { type, id, ...data } = event.data || {};

        if (type === "PROGRESS" && id) {
          const cb = this.activeCallbacks.get(id);
          if (cb?.onProgress) {
            cb.onProgress(data as WorkerProgressPayload);
          }
        } else if (type === "CONVERT_SUCCESS" && id) {
          const cb = this.activeCallbacks.get(id);
          if (cb) {
            this.activeCallbacks.delete(id);
            cb.resolve({
              outputBuffer: data.outputBuffer as ArrayBuffer,
              outputFilename: data.outputFilename as string,
              conversionType: data.conversionType as "Stream Copy" | "Full Re-Encode",
              explanation: data.explanation as string,
            });
          }
        } else if (type === "CONVERT_ERROR" && id) {
          const cb = this.activeCallbacks.get(id);
          if (cb) {
            this.activeCallbacks.delete(id);
            cb.reject(new Error(data.error || "Worker conversion failed."));
          }
        }
      };

      this.worker.onerror = (err) => {
        console.error("FFmpeg Worker error:", err);
      };
    }

    return this.worker;
  }

  /**
   * Preload FFmpeg worker engine in the background when app initializes
   */
  static preload(): void {
    if (typeof window === "undefined") return;
    const run = () => {
      this.initEngine().catch(() => {});
    };
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(run);
    } else {
      setTimeout(run, 1000);
    }
  }

  /**
   * Ensure worker and FFmpeg engine are initialized
   */
  static async initEngine(onStatus?: (msg: string) => void): Promise<void> {
    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = new Promise<void>((resolve, reject) => {
      try {
        const worker = this.getWorker();

        const handleInitResponse = (event: MessageEvent) => {
          const { type, message, error } = event.data || {};
          if (type === "INIT_PROGRESS") {
            onStatus?.(message);
          } else if (type === "INIT_SUCCESS") {
            worker.removeEventListener("message", handleInitResponse);
            resolve();
          } else if (type === "INIT_ERROR") {
            worker.removeEventListener("message", handleInitResponse);
            this.initPromise = null;
            reject(new Error(error || "Failed to initialize FFmpeg Worker engine."));
          }
        };

        worker.addEventListener("message", handleInitResponse);
        worker.postMessage({ type: "INIT" });
      } catch (e) {
        this.initPromise = null;
        reject(e instanceof Error ? e : new Error("Failed to create worker."));
      }
    });

    return this.initPromise;
  }

  /**
   * Convert video inside worker off the main thread
   */
  static async convertVideoInWorker(
    id: string,
    inputFile: File,
    metadata: VideoMetadata,
    outputFormat: SupportedOutputFormat,
    advanced?: AdvancedSettings,
    onProgress?: (progress: WorkerProgressPayload) => void,
    existingFilenames?: string[],
  ): Promise<{
    outputBuffer: ArrayBuffer;
    outputFilename: string;
    conversionType?: "Stream Copy" | "Full Re-Encode";
    explanation?: string;
  }> {
    await this.initEngine();

    const worker = this.getWorker();
    const perfProfile: DevicePerformanceProfile = PerformanceService.getDeviceProfile();

    // Read file as ArrayBuffer for worker transfer
    const arrayBuffer = await inputFile.arrayBuffer();

    return new Promise((resolve, reject) => {
      this.activeCallbacks.set(id, { resolve, reject, onProgress });

      // Post message transferring inputBuffer to worker (zero-copy memory transfer)
      worker.postMessage(
        {
          type: "CONVERT",
          id,
          inputBuffer: arrayBuffer,
          inputFilename: inputFile.name,
          metadata,
          outputFormat,
          advanced,
          performanceProfile: perfProfile,
          existingFilenames: existingFilenames || [],
        },
        [arrayBuffer],
      );
    });
  }

  /**
   * Check if engine is initialized
   */
  static isLoaded(): boolean {
    return this.initPromise !== null;
  }
}
