/**
 * Fluexa Engine - Core Types
 * Centralized type definitions for the Fluexa Conversion Intelligence Engine pipeline.
 */

export type OperationType =
  | "convert"
  | "compress"
  | "trim"
  | "merge"
  | "extract-audio"
  | "gif"
  | "gif-to-video"
  | "resize"
  | "rotate"
  | "fps"
  | "audio-convert"
  | "audio-compress"
  | "audio-trim";

export type QualityPreset = "Balanced" | "High Quality" | "Small Size" | "Stream Copy (Turbo)";

export type JobStatus =
  | "pending"
  | "queued"
  | "analyzing"
  | "processing"
  | "verifying"
  | "completed"
  | "failed"
  | "cancelled";

export type StrategyType =
  | "lossless-stream-copy"
  | "container-remux"
  | "high-quality-reencode"
  | "audio-only-processing"
  | "gif-pipeline";

export type SpeedCategory = "⚡ Instant" | "🚀 Medium" | "🐢 Heavy";

export interface DeviceProfile {
  logicalCores: number;
  deviceMemoryGB: number;
  highPerformanceDevice: boolean;
  recommendedThreads: number;
}

export interface MediaMetadata {
  filename: string;
  filesize: number;
  format: string;
  container: string;
  videoCodec?: string;
  audioCodec?: string;
  pixelFormat?: string;
  colorSpace?: string;
  bitDepth?: number;
  isVFR?: boolean;
  width?: number;
  height?: number;
  resolution?: string;
  fps?: number;
  duration: number;
  bitrate?: number;
  sampleRate?: number;
  audioChannels?: number;
  rotation?: number;
  hdrType?: string;
  hasVideo: boolean;
  hasAudio: boolean;
  codecsInferred: boolean;
  codecSource: "stream_inspection" | "container_analysis" | "browser_probe" | "extension_fallback";
}

export interface ConversionDecisionLog {
  timestamp: string;
  inputFilename: string;
  inputFormat: string;
  inputVideoCodec?: string;
  inputAudioCodec?: string;
  targetFormat: string;
  containerCompatible: boolean;
  codecCompatible: boolean;
  audioCompatible: boolean;
  filtersRequired: boolean;
  selectedStrategy: StrategyType;
  strategyName: string;
  whyReason: string;
  estimatedSpeed: SpeedCategory;
  estimatedTimeSeconds: number;
  estimatedSizeFormatted: string;
  deviceProfile: DeviceProfile;
}

export interface ProcessingStrategy {
  strategyType: StrategyType;
  isStreamCopy: boolean;
  explanation: string;
  whyExplanation: string;
  recommendedVideoCodec: string;
  recommendedAudioCodec: string;
  recommendedPreset: string;
  estimatedSpeed: SpeedCategory;
  estimatedTimeSeconds: number;
  estimatedSizeFormatted: string;
  processingComplexity: "Low" | "Medium" | "High";
  deviceProfile?: DeviceProfile;
  decisionLog?: ConversionDecisionLog;
}

export interface EngineAdvancedSettings {
  qualityPreset?: QualityPreset;
  resolution?: string; // e.g. '1080p', '720p', '480p', 'Same as Original'
  videoCodec?: string; // e.g. 'H.264', 'H.265', 'VP9', 'Auto'
  bitrate?: string; // e.g. '8M', '4M', 'Auto'
  fps?: string; // e.g. '60', '30', 'Same as Original'
  audioQuality?: string; // e.g. 'Original', '256kbps', '192kbps', '128kbps', 'Mute Audio'
  rotation?: 0 | 90 | 180 | 270;
  trimStartSeconds?: number;
  trimEndSeconds?: number;
  compressTargetSizeMB?: number;
  crfOverride?: number;
}

export interface BaseOperationOptions {
  inputFiles: File[];
  outputFormat: string;
  advancedSettings?: EngineAdvancedSettings;
  customFilename?: string;
}

export interface ConvertOperationOptions extends BaseOperationOptions {
  operation: "convert";
}

export interface CompressOperationOptions extends BaseOperationOptions {
  operation: "compress";
  targetSizeMB?: number;
  qualityLevel?: "lossless" | "balanced" | "compact";
}

export interface TrimOperationOptions extends BaseOperationOptions {
  operation: "trim";
  startTimeSeconds: number;
  endTimeSeconds: number;
}

export interface MergeOperationOptions extends BaseOperationOptions {
  operation: "merge";
}

export interface ExtractAudioOperationOptions extends BaseOperationOptions {
  operation: "extract-audio";
  audioFormat: "MP3" | "AAC" | "WAV" | "FLAC" | "OGG" | "OPUS";
  audioBitrate?: string;
}

export interface GifOperationOptions extends BaseOperationOptions {
  operation: "gif";
  fps?: number;
  scaleWidth?: number;
}

export interface GifToVideoOperationOptions extends BaseOperationOptions {
  operation: "gif-to-video";
  targetVideoFormat?: "MP4" | "WEBM" | "MOV";
}

export interface ResizeOperationOptions extends BaseOperationOptions {
  operation: "resize";
  targetWidth: number;
  targetHeight: number;
  maintainAspectRatio?: boolean;
}

export interface RotateOperationOptions extends BaseOperationOptions {
  operation: "rotate";
  degrees: 90 | 180 | 270;
}

export interface FpsOperationOptions extends BaseOperationOptions {
  operation: "fps";
  targetFps: number;
}

export interface AudioOperationOptions extends BaseOperationOptions {
  operation: "audio-convert" | "audio-compress" | "audio-trim";
  targetBitrate?: string;
  startTimeSeconds?: number;
  endTimeSeconds?: number;
}

export type AnyEngineOperationOptions =
  | ConvertOperationOptions
  | CompressOperationOptions
  | TrimOperationOptions
  | MergeOperationOptions
  | ExtractAudioOperationOptions
  | GifOperationOptions
  | GifToVideoOperationOptions
  | ResizeOperationOptions
  | RotateOperationOptions
  | FpsOperationOptions
  | AudioOperationOptions;

export interface EngineProgressState {
  jobId: string;
  percentage: number;
  timeSeconds: number;
  etaSeconds: number;
  stage: string;
  statusText: string;
  currentFileIndex?: number;
  totalFiles?: number;
}

export interface EngineResult {
  jobId: string;
  success: boolean;
  outputBlob: Blob;
  outputFilename: string;
  metadata: MediaMetadata;
  outputSize: number;
  strategyUsed: ProcessingStrategy;
  processingTimeMs: number;
  downloadUrl: string;
}

export type ProgressCallback = (progress: EngineProgressState) => void;
