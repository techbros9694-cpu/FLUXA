/**
 * VideoMorph Engine - Video to GIF & GIF to Video Operations
 */

import {
  GifOperationOptions,
  GifToVideoOperationOptions,
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

export async function executeGifOperation(
  options: GifOperationOptions,
  jobId: string,
  onProgress?: ProgressCallback,
): Promise<EngineResult> {
  const startTime = Date.now();
  const inputFile = options.inputFiles[0];

  if (!inputFile) {
    throw new VideoMorphError("No input file provided for GIF conversion.", "INVALID_INPUT");
  }

  const metadata = await EngineMetadataService.extractMetadata(inputFile);

  const cleanInputName = `input_${Date.now()}.${metadata.format.toLowerCase()}`;
  const cleanOutputName = `output_${Date.now()}.gif`;

  const strategy = SmartDecisionEngine.analyzeStrategy(metadata, "GIF", options.advancedSettings);

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
      outputFormat: "GIF",
      args: ffmpegArgs,
    },
    jobId,
    onProgress,
  );

  const outputBytes = new Uint8Array(workerRes.outputBuffer);
  const qualityCheck = EngineValidationService.validateOutputQuality(
    outputBytes,
    "GIF",
    inputFile.size,
  );

  if (!qualityCheck.isValid) {
    throw new QualityValidationError(qualityCheck.error || "Quality validation failed.");
  }

  const outputFilename =
    options.customFilename || EngineDownloadService.generateOutputFilename(inputFile.name, "GIF");

  const { url, blob } = EngineDownloadService.createDownloadUrl(outputBytes, "GIF");

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

export async function executeGifToVideoOperation(
  options: GifToVideoOperationOptions,
  jobId: string,
  onProgress?: ProgressCallback,
): Promise<EngineResult> {
  const startTime = Date.now();
  const inputFile = options.inputFiles[0];

  if (!inputFile) {
    throw new VideoMorphError("No GIF input file provided.", "INVALID_INPUT");
  }

  const metadata = await EngineMetadataService.extractMetadata(inputFile);
  const targetFmt = options.targetVideoFormat || "MP4";

  const cleanInputName = `input_${Date.now()}.gif`;
  const cleanOutputName = `converted_${Date.now()}.${targetFmt.toLowerCase()}`;

  const strategy = SmartDecisionEngine.analyzeStrategy(
    metadata,
    targetFmt,
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
      outputFormat: targetFmt,
      args: ffmpegArgs,
    },
    jobId,
    onProgress,
  );

  const outputBytes = new Uint8Array(workerRes.outputBuffer);
  const qualityCheck = EngineValidationService.validateOutputQuality(
    outputBytes,
    targetFmt,
    inputFile.size,
  );

  if (!qualityCheck.isValid) {
    throw new QualityValidationError(qualityCheck.error || "Quality validation failed.");
  }

  const outputFilename =
    options.customFilename ||
    EngineDownloadService.generateOutputFilename(inputFile.name, targetFmt);

  const { url, blob } = EngineDownloadService.createDownloadUrl(outputBytes, targetFmt);

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
