/**
 * Fluexa Engine - Conversion Intelligence Engine
 * The central intelligence brain of Fluexa. Automatically analyzes uploaded media streams,
 * detects container & codec compatibility, inspects device capabilities, and determines
 * the fastest, highest-quality, and most efficient conversion strategy with transparent reasoning.
 */

import {
  MediaMetadata,
  ProcessingStrategy,
  EngineAdvancedSettings,
  DeviceProfile,
  ConversionDecisionLog,
  StrategyType,
  SpeedCategory,
} from "../types/engine.types";

export class ConversionIntelligenceEngine {
  /**
   * Inspect browser device hardware capabilities for parallel thread & memory optimization
   */
  public static detectDeviceProfile(): DeviceProfile {
    let logicalCores = 4;
    let deviceMemoryGB = 4;

    if (typeof navigator !== "undefined") {
      if (navigator.hardwareConcurrency && !isNaN(navigator.hardwareConcurrency)) {
        logicalCores = navigator.hardwareConcurrency;
      }
      const navAny = navigator as unknown as { deviceMemory?: number };
      if (navAny.deviceMemory && !isNaN(navAny.deviceMemory)) {
        deviceMemoryGB = navAny.deviceMemory;
      }
    }

    const highPerformanceDevice = logicalCores >= 8 && deviceMemoryGB >= 8;
    const recommendedThreads = highPerformanceDevice
      ? Math.min(logicalCores, 8)
      : Math.max(2, Math.min(logicalCores, 4));

    return {
      logicalCores,
      deviceMemoryGB,
      highPerformanceDevice,
      recommendedThreads,
    };
  }

  /**
   * Determine the optimal conversion strategy using the 5-tier Fluexa strategy pipeline
   */
  public static analyzeStrategy(
    metadata: MediaMetadata,
    targetFormat: string,
    advanced?: EngineAdvancedSettings,
  ): ProcessingStrategy {
    const device = this.detectDeviceProfile();
    const inFmt = (metadata.format || metadata.container || "MP4").toUpperCase();
    const outFmt = targetFormat.toUpperCase();

    const vCodec = (metadata.videoCodec || "").toLowerCase();
    const aCodec = (metadata.audioCodec || "").toLowerCase();

    const hasCustomFilters =
      (advanced?.resolution && advanced.resolution !== "Same as Original") ||
      (advanced?.fps && advanced.fps !== "Same as Original") ||
      (advanced?.videoCodec && !advanced.videoCodec.includes("Auto")) ||
      (advanced?.bitrate && advanced.bitrate !== "Auto") ||
      (advanced?.audioQuality &&
        advanced.audioQuality !== "Auto" &&
        advanced.audioQuality !== "Original") ||
      Boolean(advanced?.trimStartSeconds && advanced.trimStartSeconds > 0) ||
      Boolean(advanced?.trimEndSeconds && advanced.trimEndSeconds > 0) ||
      Boolean(advanced?.rotation && advanced.rotation > 0) ||
      Boolean(advanced?.crfOverride);

    const isAudioOutput = ["MP3", "AAC", "WAV", "FLAC", "OGG", "OPUS", "M4A"].includes(outFmt);
    const isGifOutput = outFmt === "GIF";
    const isMP4Family = (fmt: string) => ["MP4", "MOV", "M4V", "3GP"].includes(fmt);

    // ================= STRATEGY 4: AUDIO-ONLY PROCESSING =================
    if (isAudioOutput) {
      const whyReason = `Target output format is ${outFmt} (Audio). The engine will discard the video stream entirely (-vn) and process only audio, maximizing processing speed and memory efficiency.`;
      const estTime = Math.max(2, Math.round((metadata.duration || 30) * 0.05));
      const estBytes = Math.round(((metadata.duration || 30) * 256000) / 8);

      const decisionLog: ConversionDecisionLog = {
        timestamp: new Date().toISOString(),
        inputFilename: metadata.filename,
        inputFormat: inFmt,
        inputVideoCodec: vCodec,
        inputAudioCodec: aCodec,
        targetFormat: outFmt,
        containerCompatible: false,
        codecCompatible: true,
        audioCompatible: true,
        filtersRequired: false,
        selectedStrategy: "audio-only-processing",
        strategyName: "Audio-Only Stream Extraction",
        whyReason,
        estimatedSpeed: "🚀 Medium",
        estimatedTimeSeconds: estTime,
        estimatedSizeFormatted: this.formatBytes(estBytes),
        deviceProfile: device,
      };

      return {
        strategyType: "audio-only-processing",
        isStreamCopy: false,
        explanation: "Audio-only stream extraction active.",
        whyExplanation: whyReason,
        recommendedVideoCodec: "none",
        recommendedAudioCodec: outFmt === "MP3" ? "libmp3lame" : "aac",
        recommendedPreset: "Balanced",
        estimatedSpeed: "🚀 Medium",
        estimatedTimeSeconds: estTime,
        estimatedSizeFormatted: this.formatBytes(estBytes),
        processingComplexity: "Low",
        deviceProfile: device,
        decisionLog,
      };
    }

    // ================= STRATEGY 5: GIF PIPELINE =================
    if (isGifOutput) {
      const whyReason = `Converting video to an animated GIF requires decoding frame-by-frame color palettes and applying spatial dithering for smooth looping without audio.`;
      const estTime = Math.max(5, Math.round((metadata.duration || 10) * 0.35));
      const estBytes = Math.round((metadata.duration || 10) * 280000);

      const decisionLog: ConversionDecisionLog = {
        timestamp: new Date().toISOString(),
        inputFilename: metadata.filename,
        inputFormat: inFmt,
        inputVideoCodec: vCodec,
        inputAudioCodec: aCodec,
        targetFormat: "GIF",
        containerCompatible: false,
        codecCompatible: false,
        audioCompatible: false,
        filtersRequired: true,
        selectedStrategy: "gif-pipeline",
        strategyName: "GIF Palette & Frame Pipeline",
        whyReason,
        estimatedSpeed: "🐢 Heavy",
        estimatedTimeSeconds: estTime,
        estimatedSizeFormatted: this.formatBytes(estBytes),
        deviceProfile: device,
      };

      return {
        strategyType: "gif-pipeline",
        isStreamCopy: false,
        explanation: "Animated GIF frame & palette pipeline active.",
        whyExplanation: whyReason,
        recommendedVideoCodec: "gif",
        recommendedAudioCodec: "none",
        recommendedPreset: "Balanced",
        estimatedSpeed: "🐢 Heavy",
        estimatedTimeSeconds: estTime,
        estimatedSizeFormatted: this.formatBytes(estBytes),
        processingComplexity: "High",
        deviceProfile: device,
        decisionLog,
      };
    }

    // Check if Stream Copy or Remuxing is possible (when no custom filters requested)
    if (!hasCustomFilters) {
      // ================= STRATEGY 1: LOSSLESS STREAM COPY =================
      if (inFmt === outFmt) {
        const whyReason = `Input container (${inFmt}) and target container (${outFmt}) are identical. Stream copy is 100% loss-less and near-instant with 0 quality degradation.`;
        const estTime = 2;
        const estBytes = metadata.filesize;

        const decisionLog: ConversionDecisionLog = {
          timestamp: new Date().toISOString(),
          inputFilename: metadata.filename,
          inputFormat: inFmt,
          inputVideoCodec: vCodec,
          inputAudioCodec: aCodec,
          targetFormat: outFmt,
          containerCompatible: true,
          codecCompatible: true,
          audioCompatible: true,
          filtersRequired: false,
          selectedStrategy: "lossless-stream-copy",
          strategyName: "Lossless Stream Copy (Instant)",
          whyReason,
          estimatedSpeed: "⚡ Instant",
          estimatedTimeSeconds: estTime,
          estimatedSizeFormatted: this.formatBytes(estBytes),
          deviceProfile: device,
        };

        return {
          strategyType: "lossless-stream-copy",
          isStreamCopy: true,
          explanation: "100% Lossless Stream Copy active.",
          whyExplanation: whyReason,
          recommendedVideoCodec: "copy",
          recommendedAudioCodec: "copy",
          recommendedPreset: "Stream Copy (Turbo)",
          estimatedSpeed: "⚡ Instant",
          estimatedTimeSeconds: estTime,
          estimatedSizeFormatted: this.formatBytes(estBytes),
          processingComplexity: "Low",
          deviceProfile: device,
          decisionLog,
        };
      }

      // ================= STRATEGY 2: CONTAINER REMUX =================
      // Case A: MP4 <-> MOV
      if (isMP4Family(inFmt) && isMP4Family(outFmt)) {
        const whyReason = `Your ${inFmt} file already contains video (${vCodec || "H.264"}) and audio (${aCodec || "AAC"}) natively supported by ${outFmt}. No re-encoding is necessary, so conversion is instant with zero quality loss.`;
        const estTime = 3;
        const estBytes = metadata.filesize;

        const decisionLog: ConversionDecisionLog = {
          timestamp: new Date().toISOString(),
          inputFilename: metadata.filename,
          inputFormat: inFmt,
          inputVideoCodec: vCodec,
          inputAudioCodec: aCodec,
          targetFormat: outFmt,
          containerCompatible: true,
          codecCompatible: true,
          audioCompatible: true,
          filtersRequired: false,
          selectedStrategy: "container-remux",
          strategyName: "Fast Container Remux",
          whyReason,
          estimatedSpeed: "⚡ Instant",
          estimatedTimeSeconds: estTime,
          estimatedSizeFormatted: this.formatBytes(estBytes),
          deviceProfile: device,
        };

        return {
          strategyType: "container-remux",
          isStreamCopy: true,
          explanation: "Fast Container Remux active.",
          whyExplanation: whyReason,
          recommendedVideoCodec: "copy",
          recommendedAudioCodec: "copy",
          recommendedPreset: "Stream Copy (Turbo)",
          estimatedSpeed: "⚡ Instant",
          estimatedTimeSeconds: estTime,
          estimatedSizeFormatted: this.formatBytes(estBytes),
          processingComplexity: "Low",
          deviceProfile: device,
          decisionLog,
        };
      }

      // Case B: MKV target container
      if (outFmt === "MKV") {
        const whyReason = `Matroska (MKV) natively accepts almost all video and audio codecs. The engine will remux your ${vCodec.toUpperCase()} / ${aCodec.toUpperCase()} streams directly without transcoding.`;
        const estTime = 3;
        const estBytes = metadata.filesize;

        const decisionLog: ConversionDecisionLog = {
          timestamp: new Date().toISOString(),
          inputFilename: metadata.filename,
          inputFormat: inFmt,
          inputVideoCodec: vCodec,
          inputAudioCodec: aCodec,
          targetFormat: "MKV",
          containerCompatible: true,
          codecCompatible: true,
          audioCompatible: true,
          filtersRequired: false,
          selectedStrategy: "container-remux",
          strategyName: "MKV Stream Remux",
          whyReason,
          estimatedSpeed: "⚡ Instant",
          estimatedTimeSeconds: estTime,
          estimatedSizeFormatted: this.formatBytes(estBytes),
          deviceProfile: device,
        };

        return {
          strategyType: "container-remux",
          isStreamCopy: true,
          explanation: "MKV Container Remux active.",
          whyExplanation: whyReason,
          recommendedVideoCodec: "copy",
          recommendedAudioCodec: "copy",
          recommendedPreset: "Stream Copy (Turbo)",
          estimatedSpeed: "⚡ Instant",
          estimatedTimeSeconds: estTime,
          estimatedSizeFormatted: this.formatBytes(estBytes),
          processingComplexity: "Low",
          deviceProfile: device,
          decisionLog,
        };
      }

      // Case C: WebM with VP9/VP8/AV1 + Opus/Vorbis source
      if (outFmt === "WEBM") {
        const vOk = vCodec.includes("vp9") || vCodec.includes("vp8") || vCodec.includes("av1");
        const aOk = aCodec.includes("opus") || aCodec.includes("vorbis") || !aCodec;

        if (vOk && aOk) {
          const whyReason = `Source streams (${vCodec.toUpperCase()} / ${aCodec.toUpperCase()}) are natively compatible with WebM container. Performing direct stream remux.`;
          const estTime = 3;
          const estBytes = metadata.filesize;

          return {
            strategyType: "container-remux",
            isStreamCopy: true,
            explanation: "WebM Native Remux active.",
            whyExplanation: whyReason,
            recommendedVideoCodec: "copy",
            recommendedAudioCodec: "copy",
            recommendedPreset: "Stream Copy (Turbo)",
            estimatedSpeed: "⚡ Instant",
            estimatedTimeSeconds: estTime,
            estimatedSizeFormatted: this.formatBytes(estBytes),
            processingComplexity: "Low",
            deviceProfile: device,
          };
        }
      }
    }

    // ================= STRATEGY 3: HIGH QUALITY RE-ENCODE =================
    const is4K =
      (metadata.width && metadata.width >= 3840) || (metadata.height && metadata.height >= 2160);
    const whyReason = hasCustomFilters
      ? `Custom encoding parameters (resolution, frame rate, rotation, or trim range) were requested. Re-encoding is required to apply visual filters.`
      : `${outFmt} container requires a different video/audio codec than your source file (${vCodec.toUpperCase() || "H.264"}). High-quality transcoding will preserve resolution, aspect ratio, and color fidelity.`;

    const estSpeed: SpeedCategory = is4K ? "🐢 Heavy" : "🚀 Medium";
    const estTime = Math.max(5, Math.round((metadata.duration || 30) * (is4K ? 0.45 : 0.2)));
    const estBytes = Math.round(
      metadata.filesize * (advanced?.qualityPreset === "Small Size" ? 0.5 : 0.75),
    );

    const decisionLog: ConversionDecisionLog = {
      timestamp: new Date().toISOString(),
      inputFilename: metadata.filename,
      inputFormat: inFmt,
      inputVideoCodec: vCodec,
      inputAudioCodec: aCodec,
      targetFormat: outFmt,
      containerCompatible: false,
      codecCompatible: false,
      audioCompatible: false,
      filtersRequired: hasCustomFilters,
      selectedStrategy: "high-quality-reencode",
      strategyName: "Adaptive High-Quality Transcode",
      whyReason,
      estimatedSpeed: estSpeed,
      estimatedTimeSeconds: estTime,
      estimatedSizeFormatted: this.formatBytes(estBytes),
      deviceProfile: device,
    };

    return {
      strategyType: "high-quality-reencode",
      isStreamCopy: false,
      explanation: "Adaptive High-Quality Re-encoding active.",
      whyExplanation: whyReason,
      recommendedVideoCodec: outFmt === "WEBM" ? "libvpx-vp9" : "libx264",
      recommendedAudioCodec: outFmt === "WEBM" ? "libopus" : "aac",
      recommendedPreset: advanced?.qualityPreset || "Balanced",
      estimatedSpeed: estSpeed,
      estimatedTimeSeconds: estTime,
      estimatedSizeFormatted: this.formatBytes(estBytes),
      processingComplexity: is4K ? "High" : "Medium",
      deviceProfile: device,
      decisionLog,
    };
  }

  private static formatBytes(bytes: number): string {
    if (bytes <= 0) return "0 MB";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  }
}

// Export alias for backwards compatibility
export const SmartDecisionEngine = ConversionIntelligenceEngine;
