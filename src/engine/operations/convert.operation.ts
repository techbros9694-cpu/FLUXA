/**
 * VideoMorph Engine - Convert Operation Module
 */

import { ConvertOperationOptions, EngineResult, ProgressCallback } from "../types/engine.types";
import { EngineMetadataService } from "../metadata/metadata.service";
import { SmartDecisionEngine } from "../decisionEngine/smartDecisionEngine";
import { FFmpegCommandBuilder } from "../commandBuilder/ffmpegCommandBuilder";
import { EngineWorkerManager } from "../workers/workerManager";
import { EngineValidationService } from "../validation/validation.service";
import { EngineDownloadService } from "../downloads/downloadService";
import { VideoMorphError, QualityValidationError } from "../error/engineError";

export async function executeConvertOperation(
  options: ConvertOperationOptions,
  jobId: string,
  onProgress?: ProgressCallback,
): Promise<EngineResult> {
  const startTime = Date.now();
  const inputFile = options.inputFiles[0];

  if (!inputFile) {
    throw new VideoMorphError("No input file provided for conversion.", "INVALID_INPUT");
  }

  // 1. File & Format Validation
  const valRes = EngineValidationService.isSupportedFile(inputFile);
  if (!valRes.supported) {
    throw new VideoMorphError(valRes.reason || "Unsupported input file.", "INVALID_FILE");
  }

  // 2. Metadata Detection
  const metadata = await EngineMetadataService.extractMetadata(inputFile);

  // 3. Smart Decision Engine Strategy Analysis
  const strategy = SmartDecisionEngine.analyzeStrategy(
    metadata,
    options.outputFormat,
    options.advancedSettings,
  );

  // 4. Command Generation
  const cleanInputName = `input_${Date.now()}.${metadata.format.toLowerCase()}`;
  const cleanOutputName = `output_${Date.now()}.${options.outputFormat.toLowerCase()}`;

  const ffmpegArgs = FFmpegCommandBuilder.buildCommand(
    options,
    [cleanInputName],
    cleanOutputName,
    strategy,
  );

  // 5. Execution via Worker
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

  // 6. Quality & Integrity Verification
  const qualityCheck = EngineValidationService.validateOutputQuality(
    outputBytes,
    options.outputFormat,
    inputFile.size,
  );

  if (!qualityCheck.isValid) {
    throw new QualityValidationError(qualityCheck.error || "Quality validation failed.");
  }

  // 7. Output Preparation & Download URL
  const outputFilename =
    options.customFilename ||
    EngineDownloadService.generateOutputFilename(inputFile.name, options.outputFormat);

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
