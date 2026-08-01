/**
 * VideoMorph Engine - Smart Decision Engine
 * Analyzes file codecs and target formats to automatically select between
 * instant Stream Copy (lossless remuxing) and High Quality Re-encoding.
 */

import { MediaMetadata, ProcessingStrategy, EngineAdvancedSettings } from "../types/engine.types";

export class SmartDecisionEngine {
  /**
   * Determine the optimal processing strategy for a file and target output format
   */
  static analyzeStrategy(
    metadata: MediaMetadata,
    targetFormat: string,
    advanced?: EngineAdvancedSettings,
  ): ProcessingStrategy {
    const isDefaultSettings =
      (!advanced?.resolution || advanced.resolution === "Same as Original") &&
      (!advanced?.fps || advanced.fps === "Same as Original") &&
      (!advanced?.videoCodec || advanced.videoCodec.includes("Auto")) &&
      (!advanced?.bitrate || advanced.bitrate === "Auto") &&
      (!advanced?.audioQuality ||
        advanced.audioQuality === "Auto" ||
        advanced.audioQuality === "Original") &&
      (!advanced?.qualityPreset ||
        advanced.qualityPreset === "Balanced" ||
        advanced.qualityPreset === "High Quality") &&
      !advanced?.trimStartSeconds &&
      !advanced?.trimEndSeconds &&
      !advanced?.rotation;

    if (!isDefaultSettings) {
      return {
        isStreamCopy: false,
        explanation:
          "Full re-encoding active because custom encoding parameters, filters, or trimming were requested.",
        recommendedVideoCodec: "h264",
        recommendedAudioCodec: "aac",
        recommendedPreset: advanced?.qualityPreset || "Balanced",
      };
    }

    const inFmt = metadata.format.toUpperCase();
    const outFmt = targetFormat.toUpperCase();

    const vCodec = (metadata.videoCodec || "").toLowerCase();
    const aCodec = (metadata.audioCodec || "").toLowerCase();

    const isMP4Family = (fmt: string) => ["MP4", "MOV", "M4V"].includes(fmt);

    // Case 1: Identical container
    if (inFmt === outFmt) {
      return {
        isStreamCopy: true,
        explanation:
          "Fast 100% loss-less stream copy applied because input and output container formats are identical.",
        recommendedVideoCodec: "copy",
        recommendedAudioCodec: "copy",
        recommendedPreset: "Stream Copy (Turbo)",
      };
    }

    // Case 2: MP4 <-> MOV remuxing
    if (isMP4Family(inFmt) && isMP4Family(outFmt)) {
      return {
        isStreamCopy: true,
        explanation:
          "Fast 100% loss-less stream copy applied between MP4 and MOV container formats.",
        recommendedVideoCodec: "copy",
        recommendedAudioCodec: "copy",
        recommendedPreset: "Stream Copy (Turbo)",
      };
    }

    // Case 3: MP4 output with H.264 / HEVC + AAC / MP3 source
    if (["MP4", "MOV", "M4V"].includes(outFmt)) {
      const vOk =
        vCodec.includes("h264") ||
        vCodec.includes("hevc") ||
        vCodec.includes("h265") ||
        vCodec.includes("av1") ||
        vCodec.includes("mpeg4");
      const aOk =
        aCodec.includes("aac") || aCodec.includes("mp3") || aCodec.includes("ac3") || !aCodec;

      if (vOk && aOk) {
        return {
          isStreamCopy: true,
          explanation:
            "Fast 100% loss-less stream copy applied because source streams are natively supported by MP4 container.",
          recommendedVideoCodec: "copy",
          recommendedAudioCodec: "copy",
          recommendedPreset: "Stream Copy (Turbo)",
        };
      }
    }

    // Case 4: MKV container accepts almost any codec natively
    if (outFmt === "MKV") {
      return {
        isStreamCopy: true,
        explanation:
          "Fast 100% loss-less stream copy applied because MKV natively accepts source streams.",
        recommendedVideoCodec: "copy",
        recommendedAudioCodec: "copy",
        recommendedPreset: "Stream Copy (Turbo)",
      };
    }

    // Case 5: WebM container (needs VP8/VP9/AV1 + Opus/Vorbis)
    if (outFmt === "WEBM") {
      const vOk = vCodec.includes("vp9") || vCodec.includes("vp8") || vCodec.includes("av1");
      const aOk = aCodec.includes("opus") || aCodec.includes("vorbis") || !aCodec;

      if (vOk && aOk) {
        return {
          isStreamCopy: true,
          explanation: "Fast 100% loss-less stream copy applied for WebM compatible streams.",
          recommendedVideoCodec: "copy",
          recommendedAudioCodec: "copy",
          recommendedPreset: "Stream Copy (Turbo)",
        };
      }
    }

    // Case 6: MPEG-TS container
    if (outFmt === "TS") {
      const vOk =
        vCodec.includes("h264") ||
        vCodec.includes("hevc") ||
        vCodec.includes("h265") ||
        vCodec.includes("mpeg2");
      const aOk =
        aCodec.includes("aac") || aCodec.includes("mp3") || aCodec.includes("ac3") || !aCodec;

      if (vOk && aOk) {
        return {
          isStreamCopy: true,
          explanation: "Fast 100% loss-less stream copy applied for MPEG-TS transport container.",
          recommendedVideoCodec: "copy",
          recommendedAudioCodec: "copy",
          recommendedPreset: "Stream Copy (Turbo)",
        };
      }
    }

    // Fallback: Full Re-encode
    return {
      isStreamCopy: false,
      explanation:
        "Full high-fidelity re-encoding active to convert streams into target container format safely.",
      recommendedVideoCodec: outFmt === "WEBM" ? "libvpx-vp9" : "libx264",
      recommendedAudioCodec: outFmt === "WEBM" ? "libvorbis" : "aac",
      recommendedPreset: advanced?.qualityPreset || "Balanced",
    };
  }
}
