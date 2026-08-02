export type WorkflowStep = "upload" | "analyzing" | "configured" | "converting" | "done" | "error";

export type ItemStatus = "waiting" | "converting" | "completed" | "failed";

export type ConversionStage =
  | "Loading FFmpeg"
  | "Reading Metadata"
  | "Preparing Conversion"
  | "Optimizing Streams"
  | "Converting Video"
  | "Processing Audio"
  | "Writing Output File"
  | "Preparing Download"
  | "Cleaning Temporary Files"
  | "Finished";

export interface BatchItem {
  id: string;
  file: File;
  metadata: VideoMetadata | null;
  outputFormat: SupportedOutputFormat;
  advancedSettings: AdvancedSettings;
  status: ItemStatus;
  progress: number; // 0 - 100
  stage?: ConversionStage | string;
  elapsedSeconds?: number;
  etaSeconds?: number;
  speed?: string;
  fps?: number;
  throughputMBs?: number;
  threads?: number;
  conversionType?: "Stream Copy" | "Full Re-Encode";
  strategyName?: string;
  whyExplanation?: string;
  estimatedSpeed?: string;
  explanation?: string;
  funnyMessage?: string;
  statusText?: string;
  result?: ConversionResult | null;
  error?: string | null;
}

export interface VideoMetadata {
  filename: string;
  fileSize: number;
  sizeFormatted: string;
  format: string;
  container: string;
  videoCodec: string;
  audioCodec: string;
  resolution: string; // e.g. "1920x1080"
  width: number;
  height: number;
  duration: number; // in seconds
  durationFormatted: string; // e.g. "02:43"
  fps: string; // e.g. "30" or "60"
  bitrate?: string; // e.g. "4.2 Mbps"
}

export type SupportedOutputFormat =
  | "MP4"
  | "MOV"
  | "MKV"
  | "AVI"
  | "WEBM"
  | "WMV"
  | "FLV"
  | "MPEG"
  | "M4V"
  | "OGV"
  | "TS"
  | "3GP"
  | "GIF"
  | "MP3";

export interface OutputFormatOption {
  id: SupportedOutputFormat;
  title: string;
  recommended?: boolean;
  desc: string;
  compatibility: string;
  iconName: string;
  buttonLabel: string;
  defaultCodec: string;
  defaultAudio: string;
  isAudioOnly?: boolean;
}

export type QualityPreset = "High Quality" | "Balanced" | "Small Size";

export interface AdvancedSettings {
  qualityPreset: QualityPreset; // "Balanced" | "High Quality" | "Small Size"
  resolution: string; // "Same as Original" | "4K (2160p)" | "1080p" | "720p" | "480p" | "360p"
  videoCodec: string; // "Auto (Recommended)" | "H.264" | "H.265 / HEVC" | "VP9" | "AV1" | "ProRes"
  bitrate: string; // "Auto" | "16 Mbps" | "12 Mbps" | "8 Mbps" | "4 Mbps" | "2 Mbps"
  fps: string; // "Same as Original" | "60 FPS" | "30 FPS" | "24 FPS"
  audioQuality: string; // "Original" | "320 kbps" | "256 kbps" | "192 kbps" | "128 kbps" | "Mute Audio"
}

export interface RealProgressState {
  percentage: number; // 0 - 100
  timeSeconds: number; // elapsed processing time in target video
  speed?: string; // e.g. "1.5x"
  fps?: number; // e.g. 42
  throughputMBs?: number; // e.g. 18.2
  threads?: number;
  stage: ConversionStage | string;
  conversionType?: "Stream Copy" | "Full Re-Encode";
  explanation?: string;
  etaSeconds?: number; // estimated remaining time
  funnyMessage: string;
  statusText: string;
}

export interface ConversionResult {
  blob: Blob;
  downloadUrl: string;
  filename: string;
  outputFormat: SupportedOutputFormat;
  originalSizeFormatted: string;
  originalSizeBytes: number;
  outputSizeFormatted: string;
  outputSizeBytes: number;
  durationSeconds: number;
  conversionType?: "Stream Copy" | "Full Re-Encode";
  explanation?: string;
  conversionTimeSeconds?: number;
}

export interface BatchSummaryStats {
  totalFiles: number;
  convertedFiles: number;
  failedFiles: number;
  totalOriginalSizeBytes: number;
  totalOutputSizeBytes: number;
  totalOriginalSizeFormatted: string;
  totalOutputSizeFormatted: string;
  savedSizeBytes: number;
  savedSizeFormatted: string;
  compressionRatioPercent: number;
  totalBatchTimeSeconds: number;
  totalBatchTimeFormatted: string;
  avgSpeedRatio?: string;
}

export interface ValidationError {
  title: string;
  message: string;
}
