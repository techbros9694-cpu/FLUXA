/**
 * VideoMorph Engine - Extract Audio Operation Module
 */

import {
  ExtractAudioOperationOptions,
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

export async function executeExtractAudioOperation(
  options: ExtractAudioOperationOptions,
  jobId: string,
  onProgress?: ProgressCallback,
): Promise<EngineResult> {
  const startTime = Date.now();
  const inputFile = options.inputFiles[0];

  if (!inputFile) {
    throw new VideoMorphError("No input file provided for audio extraction.", "INVALID_INPUT");
  }

  const metadata = await EngineMetadataService.extractMetadata(inputFile);

  const cleanInputName = `input_${Date.now()}.${metadata.format.toLowerCase()}`;
  const cleanOutputName = `extracted_audio_${Date.now()}.${options.audioFormat.toLowerCase()}`;

  const strategy = SmartDecisionEngine.analyzeStrategy(
    metadata,
    options.audioFormat,
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
      outputFormat: options.audioFormat,
      args: ffmpegArgs,
    },
    jobId,
    onProgress,
  );

  const outputBytes = new Uint8Array(workerRes.outputBuffer);
  const qualityCheck = EngineValidationService.validateOutputQuality(
    outputBytes,
    options.audioFormat,
    inputFile.size,
  );

  if (!qualityCheck.isValid) {
    throw new QualityValidationError(qualityCheck.error || "Quality validation failed.");
  }

  const outputFilename =
    options.customFilename ||
    EngineDownloadService.generateOutputFilename(inputFile.name, options.audioFormat, "extracted");

  const { url, blob } = EngineDownloadService.createDownloadUrl(outputBytes, options.audioFormat);

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
