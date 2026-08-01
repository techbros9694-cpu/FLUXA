/**
 * VideoMorph Engine - Core Types
 * Centralized type definitions for the VideoMorph Engine processing pipeline.
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

export interface MediaMetadata {
  filename: string;
  filesize: number;
  format: string;
  container: string;
  videoCodec?: string;
  audioCodec?: string;
  width?: number;
  height?: number;
  resolution?: string;
  fps?: number;
  duration: number;
  bitrate?: number;
  sampleRate?: number;
  audioChannels?: number;
  hasVideo: boolean;
  hasAudio: boolean;
}

export interface ProcessingStrategy {
  isStreamCopy: boolean;
  explanation: string;
  recommendedVideoCodec: string;
  recommendedAudioCodec: string;
  recommendedPreset: string;
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
