/**
 * VideoMorph Engine - Quality Profiles
 * Codec configuration profiles designed to preserve maximum visual and audio quality.
 */

export interface CodecProfile {
  codec: string;
  preset: string;
  crf: number;
  cpuUsed?: number;
  deadline?: string;
  pixelFormat?: string;
  defaultAudioCodec: string;
  defaultAudioBitrate: string;
}

export const CODEC_PROFILES: Record<string, Record<string, CodecProfile>> = {
  H264: {
    Balanced: {
      codec: "libx264",
      preset: "fast",
      crf: 19,
      pixelFormat: "yuv420p",
      defaultAudioCodec: "aac",
      defaultAudioBitrate: "192k",
    },
    "High Quality": {
      codec: "libx264",
      preset: "medium",
      crf: 17,
      pixelFormat: "yuv420p",
      defaultAudioCodec: "aac",
      defaultAudioBitrate: "256k",
    },
    "Small Size": {
      codec: "libx264",
      preset: "faster",
      crf: 24,
      pixelFormat: "yuv420p",
      defaultAudioCodec: "aac",
      defaultAudioBitrate: "128k",
    },
  },
  H265: {
    Balanced: {
      codec: "libx265",
      preset: "fast",
      crf: 21,
      pixelFormat: "yuv420p",
      defaultAudioCodec: "aac",
      defaultAudioBitrate: "192k",
    },
    "High Quality": {
      codec: "libx265",
      preset: "medium",
      crf: 19,
      pixelFormat: "yuv420p",
      defaultAudioCodec: "aac",
      defaultAudioBitrate: "256k",
    },
    "Small Size": {
      codec: "libx265",
      preset: "faster",
      crf: 26,
      pixelFormat: "yuv420p",
      defaultAudioCodec: "aac",
      defaultAudioBitrate: "128k",
    },
  },
  VP9: {
    Balanced: {
      codec: "libvpx-vp9",
      preset: "good",
      crf: 22,
      cpuUsed: 2,
      deadline: "good",
      pixelFormat: "yuv420p",
      defaultAudioCodec: "libopus",
      defaultAudioBitrate: "192k",
    },
    "High Quality": {
      codec: "libvpx-vp9",
      preset: "good",
      crf: 18,
      cpuUsed: 1,
      deadline: "good",
      pixelFormat: "yuv420p",
      defaultAudioCodec: "libopus",
      defaultAudioBitrate: "256k",
    },
    "Small Size": {
      codec: "libvpx-vp9",
      preset: "realtime",
      crf: 30,
      cpuUsed: 4,
      deadline: "realtime",
      pixelFormat: "yuv420p",
      defaultAudioCodec: "libopus",
      defaultAudioBitrate: "128k",
    },
  },
  GIF: {
    Balanced: {
      codec: "gif",
      preset: "lanczos",
      crf: 0,
      defaultAudioCodec: "none",
      defaultAudioBitrate: "0",
    },
  },
};

export function getProfile(format: string, preset: string = "Balanced"): CodecProfile {
  const fmtKey = format.toUpperCase();
  if (fmtKey === "WEBM") {
    return CODEC_PROFILES.VP9[preset] || CODEC_PROFILES.VP9.Balanced;
  }
  if (fmtKey === "GIF") {
    return CODEC_PROFILES.GIF.Balanced;
  }
  return CODEC_PROFILES.H264[preset] || CODEC_PROFILES.H264.Balanced;
}
