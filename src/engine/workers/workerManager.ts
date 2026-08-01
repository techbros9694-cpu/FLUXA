/**
 * VideoMorph Engine - Worker Manager
 * Handles dedicated Web Worker execution for client-side FFmpeg WASM processing.
 */

import { EngineProgressState, ProgressCallback } from "../types/engine.types";

export interface WorkerExecutePayload {
  inputData: ArrayBuffer;
  inputFilename: string;
  outputFormat: string;
  args: string[];
}

export interface WorkerExecuteResponse {
  outputBuffer: ArrayBuffer;
  outputFilename: string;
}

export class EngineWorkerManager {
  private static workerInstance: Worker | null = null;

  /**
   * Preload or retrieve Web Worker instance
   */
  static getWorker(): Worker {
    if (!this.workerInstance) {
      this.workerInstance = new Worker(new URL("../../workers/ffmpeg.worker.ts", import.meta.url), {
        type: "module",
      });
    }
    return this.workerInstance;
  }

  /**
   * Terminate active worker
   */
  static terminateWorker(): void {
    if (this.workerInstance) {
      this.workerInstance.terminate();
      this.workerInstance = null;
    }
  }

  /**
   * Execute job in Web Worker with progress updates
   */
  static async runJobInWorker(
    payload: WorkerExecutePayload,
    jobId: string,
    onProgress?: ProgressCallback,
  ): Promise<WorkerExecuteResponse> {
    const worker = this.getWorker();

    return new Promise((resolve, reject) => {
      const handleMessage = (e: MessageEvent) => {
        const { type, payload: resPayload, error } = e.data;

        if (type === "PROGRESS") {
          if (onProgress) {
            onProgress({
              jobId,
              percentage: resPayload.percentage || 0,
              timeSeconds: resPayload.timeSeconds || 0,
              etaSeconds: resPayload.etaSeconds || 0,
              stage: resPayload.stage || "Processing",
              statusText: resPayload.statusText || "Encoding media streams...",
            });
          }
        } else if (type === "COMPLETED") {
          worker.removeEventListener("message", handleMessage);
          worker.removeEventListener("error", handleError);
          resolve({
            outputBuffer: resPayload.outputBuffer,
            outputFilename: resPayload.outputFilename,
          });
        } else if (type === "ERROR") {
          worker.removeEventListener("message", handleMessage);
          worker.removeEventListener("error", handleError);
          reject(new Error(error || "Worker conversion failed."));
        }
      };

      const handleError = (err: ErrorEvent) => {
        worker.removeEventListener("message", handleMessage);
        worker.removeEventListener("error", handleError);
        reject(new Error(`FFmpeg Worker error: ${err.message}`));
      };

      worker.addEventListener("message", handleMessage);
      worker.addEventListener("error", handleError);

      worker.postMessage(
        {
          type: "CONVERT",
          payload: {
            inputBuffer: payload.inputData,
            inputFilename: payload.inputFilename,
            outputFormat: payload.outputFormat,
            ffmpegArgs: payload.args,
          },
        },
        [payload.inputData],
      );
    });
  }
}
