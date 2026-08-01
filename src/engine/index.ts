/**
 * VideoMorph Engine - Central Processing Engine
 * Unified backend and processing pipeline powering present and future media tools.
 */

import {
  AnyEngineOperationOptions,
  ConvertOperationOptions,
  CompressOperationOptions,
  TrimOperationOptions,
  MergeOperationOptions,
  ExtractAudioOperationOptions,
  GifOperationOptions,
  GifToVideoOperationOptions,
  ResizeOperationOptions,
  RotateOperationOptions,
  AudioOperationOptions,
  EngineResult,
  ProgressCallback,
  MediaMetadata,
} from "./types/engine.types";

import { JobQueue } from "./queue/jobQueue";
import { EngineMetadataService } from "./metadata/metadata.service";
import { EngineValidationService } from "./validation/validation.service";
import { MemoryManager } from "./memory/memoryManager";
import { EngineErrorHandler } from "./error/engineError";

import { executeConvertOperation } from "./operations/convert.operation";
import { executeCompressOperation } from "./operations/compress.operation";
import { executeTrimOperation } from "./operations/trim.operation";
import { executeExtractAudioOperation } from "./operations/extractAudio.operation";
import { executeGifOperation, executeGifToVideoOperation } from "./operations/gif.operation";
import {
  executeMergeOperation,
  executeResizeOperation,
  executeRotateOperation,
  executeAudioOperation,
} from "./operations/utility.operations";

export class VideoMorphEngine {
  private static instance: VideoMorphEngine;
  private queue: JobQueue = new JobQueue();

  private constructor() {}

  /**
   * Singleton instance retriever
   */
  public static getInstance(): VideoMorphEngine {
    if (!VideoMorphEngine.instance) {
      VideoMorphEngine.instance = new VideoMorphEngine();
    }
    return VideoMorphEngine.instance;
  }

  /**
   * Access the underlying job queue
   */
  public getQueue(): JobQueue {
    return this.queue;
  }

  /**
   * Inspect metadata of a media file
   */
  public async inspect(file: File): Promise<MediaMetadata> {
    return EngineMetadataService.extractMetadata(file);
  }

  /**
   * Validate a media file
   */
  public validate(file: File) {
    return EngineValidationService.isSupportedFile(file);
  }

  /**
   * Universal Operation Dispatcher
   */
  public async process(
    options: AnyEngineOperationOptions,
    onProgress?: ProgressCallback,
  ): Promise<EngineResult> {
    const job = this.queue.enqueue(options);

    try {
      let result: EngineResult;

      switch (options.operation) {
        case "convert":
          result = await executeConvertOperation(
            options as ConvertOperationOptions,
            job.id,
            onProgress,
          );
          break;
        case "compress":
          result = await executeCompressOperation(
            options as CompressOperationOptions,
            job.id,
            onProgress,
          );
          break;
        case "trim":
          result = await executeTrimOperation(options as TrimOperationOptions, job.id, onProgress);
          break;
        case "merge":
          result = await executeMergeOperation(
            options as MergeOperationOptions,
            job.id,
            onProgress,
          );
          break;
        case "extract-audio":
          result = await executeExtractAudioOperation(
            options as ExtractAudioOperationOptions,
            job.id,
            onProgress,
          );
          break;
        case "gif":
          result = await executeGifOperation(options as GifOperationOptions, job.id, onProgress);
          break;
        case "gif-to-video":
          result = await executeGifToVideoOperation(
            options as GifToVideoOperationOptions,
            job.id,
            onProgress,
          );
          break;
        case "resize":
          result = await executeResizeOperation(
            options as ResizeOperationOptions,
            job.id,
            onProgress,
          );
          break;
        case "rotate":
          result = await executeRotateOperation(
            options as RotateOperationOptions,
            job.id,
            onProgress,
          );
          break;
        case "audio-convert":
        case "audio-compress":
        case "audio-trim":
          result = await executeAudioOperation(
            options as AudioOperationOptions,
            job.id,
            onProgress,
          );
          break;
        default:
          result = await executeConvertOperation(
            options as ConvertOperationOptions,
            job.id,
            onProgress,
          );
          break;
      }

      this.queue.markCompleted(job.id, result);
      return result;
    } catch (err) {
      const handledErr = EngineErrorHandler.handle(err);
      this.queue.markFailed(job.id, handledErr.message);
      throw handledErr;
    }
  }

  // Convenient typed helper aliases
  public async convert(
    options: Omit<ConvertOperationOptions, "operation">,
    onProgress?: ProgressCallback,
  ) {
    return this.process({ ...options, operation: "convert" }, onProgress);
  }

  public async compress(
    options: Omit<CompressOperationOptions, "operation">,
    onProgress?: ProgressCallback,
  ) {
    return this.process({ ...options, operation: "compress" }, onProgress);
  }

  public async trim(
    options: Omit<TrimOperationOptions, "operation">,
    onProgress?: ProgressCallback,
  ) {
    return this.process({ ...options, operation: "trim" }, onProgress);
  }

  public async extractAudio(
    options: Omit<ExtractAudioOperationOptions, "operation">,
    onProgress?: ProgressCallback,
  ) {
    return this.process({ ...options, operation: "extract-audio" }, onProgress);
  }

  public async toGif(
    options: Omit<GifOperationOptions, "operation">,
    onProgress?: ProgressCallback,
  ) {
    return this.process({ ...options, operation: "gif" }, onProgress);
  }

  public async gifToVideo(
    options: Omit<GifToVideoOperationOptions, "operation">,
    onProgress?: ProgressCallback,
  ) {
    return this.process({ ...options, operation: "gif-to-video" }, onProgress);
  }

  public async merge(
    options: Omit<MergeOperationOptions, "operation">,
    onProgress?: ProgressCallback,
  ) {
    return this.process({ ...options, operation: "merge" }, onProgress);
  }

  public async resize(
    options: Omit<ResizeOperationOptions, "operation">,
    onProgress?: ProgressCallback,
  ) {
    return this.process({ ...options, operation: "resize" }, onProgress);
  }

  public async rotate(
    options: Omit<RotateOperationOptions, "operation">,
    onProgress?: ProgressCallback,
  ) {
    return this.process({ ...options, operation: "rotate" }, onProgress);
  }

  /**
   * Release memory & resources
   */
  public cleanup(): void {
    MemoryManager.cleanupAllUrls();
    this.queue.clear();
  }
}

// Global export singleton
export const engine = VideoMorphEngine.getInstance();
