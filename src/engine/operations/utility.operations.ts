/**
 * VideoMorph Engine - Media Utility Operations
 * Implements Merge, Resize, Rotate, FPS, and Audio operations.
 */

import {
  MergeOperationOptions,
  ResizeOperationOptions,
  RotateOperationOptions,
  FpsOperationOptions,
  AudioOperationOptions,
  EngineResult,
  ProgressCallback,
} from "../types/engine.types";
import { EngineMetadataService } from "../metadata/metadata.service";
import { SmartDecisionEngine } from "../decisionEngine/smartDecisionEngine";
import { FFmpegCommandBuilder } from "../commandBuilder/ffmpegCommandBuilder";
import { EngineWorkerManager } from "../workers/workerManager";
import { EngineValidationService } from "../validation/validation.service";
import { EngineDownloadService } from "../downloads/downloadService";
import { VideoMorphError, QualityValidationError } from "../error/engineError";

export async function executeMergeOperation(
  options: MergeOperationOptions,
  jobId: string,
  onProgress?: ProgressCallback,
): Promise<EngineResult> {
  const startTime = Date.now();
  if (!options.inputFiles || options.inputFiles.length < 2) {
    throw new VideoMorphError("Merging requires at least 2 input files.", "INVALID_INPUT");
  }

  const primaryFile = options.inputFiles[0];
  const metadata = await EngineMetadataService.extractMetadata(primaryFile);

  const cleanInputNames = options.inputFiles.map((_, i) => `merge_input_${i}_${Date.now()}.mp4`);
  const cleanOutputName = `merged_${Date.now()}.${options.outputFormat.toLowerCase()}`;

  const strategy = SmartDecisionEngine.analyzeStrategy(
    metadata,
    options.outputFormat,
    options.advancedSettings,
  );

  const ffmpegArgs = FFmpegCommandBuilder.buildCommand(
    options,
    cleanInputNames,
    cleanOutputName,
    strategy,
  );

  const primaryBuffer = await primaryFile.arrayBuffer();
  const workerRes = await EngineWorkerManager.runJobInWorker(
    {
      inputData: primaryBuffer,
      inputFilename: cleanInputNames[0],
      outputFormat: options.outputFormat,
      args: ffmpegArgs,
    },
    jobId,
    onProgress,
  );

  const outputBytes = new Uint8Array(workerRes.outputBuffer);
  const qualityCheck = EngineValidationService.validateOutputQuality(
    outputBytes,
    options.outputFormat,
    primaryFile.size,
  );

  if (!qualityCheck.isValid) {
    throw new QualityValidationError(qualityCheck.error || "Quality validation failed.");
  }

  const outputFilename =
    options.customFilename || `merged_video.${options.outputFormat.toLowerCase()}`;

  const { url, blob } = EngineDownloadService.createDownloadUrl(outputBytes, options.outputFormat);

  return {
    jobId,
    success: true,
    outputBlob: blob,
    outputFilename,
    metadata,
    outputSize: blob.size,
    strategyUsed: strategy,
    processingTimeMs: Date.now() - startTime,
    downloadUrl: url,
  };
}

export async function executeResizeOperation(
  options: ResizeOperationOptions,
  jobId: string,
  onProgress?: ProgressCallback,
): Promise<EngineResult> {
  const startTime = Date.now();
  const inputFile = options.inputFiles[0];

  if (!inputFile) {
    throw new VideoMorphError("No input file provided for resizing.", "INVALID_INPUT");
  }

  const metadata = await EngineMetadataService.extractMetadata(inputFile);
  const cleanInputName = `input_${Date.now()}.${metadata.format.toLowerCase()}`;
  const cleanOutputName = `resized_${Date.now()}.${options.outputFormat.toLowerCase()}`;

  const strategy = SmartDecisionEngine.analyzeStrategy(
    metadata,
    options.outputFormat,
    options.advancedSettings,
  );

  const ffmpegArgs = FFmpegCommandBuilder.buildCommand(
    options,
    [cleanInputName],
    cleanOutputName,
    strategy,
  );

  const inputBuffer = await inputFile.arrayBuffer();
  const workerRes = await EngineWorkerManager.runJobInWorker(
    {
      inputData: inputBuffer,
      inputFilename: cleanInputName,
      outputFormat: options.outputFormat,
      args: ffmpegArgs,
    },
    jobId,
    onProgress,
  );

  const outputBytes = new Uint8Array(workerRes.outputBuffer);
  const { url, blob } = EngineDownloadService.createDownloadUrl(outputBytes, options.outputFormat);

  return {
    jobId,
    success: true,
    outputBlob: blob,
    outputFilename:
      options.customFilename ||
      EngineDownloadService.generateOutputFilename(inputFile.name, options.outputFormat, "resized"),
    metadata,
    outputSize: blob.size,
    strategyUsed: strategy,
    processingTimeMs: Date.now() - startTime,
    downloadUrl: url,
  };
}

export async function executeRotateOperation(
  options: RotateOperationOptions,
  jobId: string,
  onProgress?: ProgressCallback,
): Promise<EngineResult> {
  const startTime = Date.now();
  const inputFile = options.inputFiles[0];

  if (!inputFile) {
    throw new VideoMorphError("No input file provided for rotation.", "INVALID_INPUT");
  }

  const metadata = await EngineMetadataService.extractMetadata(inputFile);
  const cleanInputName = `input_${Date.now()}.${metadata.format.toLowerCase()}`;
  const cleanOutputName = `rotated_${Date.now()}.${options.outputFormat.toLowerCase()}`;

  const strategy = SmartDecisionEngine.analyzeStrategy(
    metadata,
    options.outputFormat,
    options.advancedSettings,
  );

  const ffmpegArgs = FFmpegCommandBuilder.buildCommand(
    options,
    [cleanInputName],
    cleanOutputName,
    strategy,
  );

  const inputBuffer = await inputFile.arrayBuffer();
  const workerRes = await EngineWorkerManager.runJobInWorker(
    {
      inputData: inputBuffer,
      inputFilename: cleanInputName,
      outputFormat: options.outputFormat,
      args: ffmpegArgs,
    },
    jobId,
    onProgress,
  );

  const outputBytes = new Uint8Array(workerRes.outputBuffer);
  const { url, blob } = EngineDownloadService.createDownloadUrl(outputBytes, options.outputFormat);

  return {
    jobId,
    success: true,
    outputBlob: blob,
    outputFilename:
      options.customFilename ||
      EngineDownloadService.generateOutputFilename(inputFile.name, options.outputFormat, "rotated"),
    metadata,
    outputSize: blob.size,
    strategyUsed: strategy,
    processingTimeMs: Date.now() - startTime,
    downloadUrl: url,
  };
}

export async function executeAudioOperation(
  options: AudioOperationOptions,
  jobId: string,
  onProgress?: ProgressCallback,
): Promise<EngineResult> {
  const startTime = Date.now();
  const inputFile = options.inputFiles[0];

  if (!inputFile) {
    throw new VideoMorphError("No input audio file provided.", "INVALID_INPUT");
  }

  const metadata = await EngineMetadataService.extractMetadata(inputFile);
  const cleanInputName = `input_${Date.now()}.${metadata.format.toLowerCase()}`;
  const cleanOutputName = `audio_${Date.now()}.${options.outputFormat.toLowerCase()}`;

  const strategy = SmartDecisionEngine.analyzeStrategy(
    metadata,
    options.outputFormat,
    options.advancedSettings,
  );

  const ffmpegArgs = FFmpegCommandBuilder.buildCommand(
    options,
    [cleanInputName],
    cleanOutputName,
    strategy,
  );

  const inputBuffer = await inputFile.arrayBuffer();
  const workerRes = await EngineWorkerManager.runJobInWorker(
    {
      inputData: inputBuffer,
      inputFilename: cleanInputName,
      outputFormat: options.outputFormat,
      args: ffmpegArgs,
    },
    jobId,
    onProgress,
  );

  const outputBytes = new Uint8Array(workerRes.outputBuffer);
  const { url, blob } = EngineDownloadService.createDownloadUrl(outputBytes, options.outputFormat);

  return {
    jobId,
    success: true,
    outputBlob: blob,
    outputFilename:
      options.customFilename ||
      EngineDownloadService.generateOutputFilename(inputFile.name, options.outputFormat),
    metadata,
    outputSize: blob.size,
    strategyUsed: strategy,
    processingTimeMs: Date.now() - startTime,
    downloadUrl: url,
  };
}
