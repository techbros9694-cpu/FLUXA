import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";
import { SupportedOutputFormat, AdvancedSettings, VideoMetadata } from "../types/converter";
import { DevicePerformanceProfile } from "../services/performanceService";

let ffmpegInstance: FFmpeg | null = null;
let isLoaded = false;
let loadingPromise: Promise<FFmpeg> | null = null;

async function getCachedUrl(url: string, mimeType: string): Promise<string> {
  if (typeof self !== "undefined" && "caches" in self) {
    try {
      const cache = await self.caches.open("fluxa-ffmpeg-v1");
      let response = await cache.match(url);
      if (!response) {
        response = await fetch(url);
        if (response.ok) {
          await cache.put(url, response.clone());
        }
      }
      if (response && response.ok) {
        const blob = await response.blob();
        return URL.createObjectURL(new Blob([blob], { type: mimeType }));
      }
    } catch (e) {
      console.warn("Worker Cache API fallback:", e);
    }
  }
  return toBlobURL(url, mimeType);
}

async function loadFFmpeg(): Promise<FFmpeg> {
  if (ffmpegInstance && isLoaded) return ffmpegInstance;
  if (loadingPromise) return loadingPromise;

  loadingPromise = (async () => {
    try {
      self.postMessage({
        type: "INIT_PROGRESS",
        message: "Loading FFmpeg WebAssembly engine...",
      });

      const ffmpeg = new FFmpeg();

      ffmpeg.on("log", ({ message }) => {
        self.postMessage({ type: "FFMPEG_LOG", message });
      });

      const primaryURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm";
      const fallbackURL = "https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.6/dist/esm";

      self.postMessage({
        type: "INIT_PROGRESS",
        message: "Loading cached WASM core...",
      });

      let coreURL = "";
      let wasmURL = "";

      try {
        [coreURL, wasmURL] = await Promise.all([
          getCachedUrl(`${primaryURL}/ffmpeg-core.js`, "text/javascript"),
          getCachedUrl(`${primaryURL}/ffmpeg-core.wasm`, "application/wasm"),
        ]);
      } catch {
        [coreURL, wasmURL] = await Promise.all([
          getCachedUrl(`${fallbackURL}/ffmpeg-core.js`, "text/javascript"),
          getCachedUrl(`${fallbackURL}/ffmpeg-core.wasm`, "application/wasm"),
        ]);
      }

      self.postMessage({
        type: "INIT_PROGRESS",
        message: "Initializing conversion worker...",
      });

      await ffmpeg.load({ coreURL, wasmURL });

      ffmpegInstance = ffmpeg;
      isLoaded = true;
      self.postMessage({ type: "INIT_PROGRESS", message: "FFmpeg Engine Ready!" });
      return ffmpeg;
    } catch (err: unknown) {
      loadingPromise = null;
      isLoaded = false;
      const errMsg = err instanceof Error ? err.message : "Failed to load FFmpeg in your browser.";
      throw new Error(errMsg);
    }
  })();

  return loadingPromise;
}

function getUniqueOutputFilename(
  originalFilename: string,
  outputFormat: SupportedOutputFormat,
  existingFilenames: string[] = [],
): string {
  const existingSet = new Set(existingFilenames);
  const lastDotIndex = originalFilename.lastIndexOf(".");
  const baseName =
    lastDotIndex > 0 ? originalFilename.substring(0, lastDotIndex) : originalFilename;
  const targetExt = outputFormat.toLowerCase();

  let candidate = `${baseName}.${targetExt}`;
  if (existingSet.has(candidate)) {
    let counter = 1;
    while (existingSet.has(`${baseName} (${counter}).${targetExt}`)) {
      counter++;
    }
    candidate = `${baseName} (${counter}).${targetExt}`;
  }

  return candidate;
}

function checkStreamCopyCandidate(
  inputExt: string,
  outputFormat: SupportedOutputFormat,
  metadata: VideoMetadata,
  advanced?: AdvancedSettings,
): { isCandidate: boolean; explanation: string } {
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
      advanced.qualityPreset === "High Quality");

  if (!isDefaultSettings) {
    return {
      isCandidate: false,
      explanation:
        "Optimized re-encoding active: custom encoding parameters (resolution, frame rate, codec override, or audio quality) were explicitly requested.",
    };
  }

  const inFmt = (inputExt || metadata.format || "MP4").toUpperCase();
  const outFmt = outputFormat.toUpperCase();

  const vCodecRaw = (metadata.videoCodec || "").toLowerCase();
  const aCodecRaw = (metadata.audioCodec || "").toLowerCase();

  const isH264 =
    vCodecRaw.includes("h264") ||
    vCodecRaw.includes("avc") ||
    vCodecRaw.includes("x264") ||
    vCodecRaw.includes("mp4v");
  const isHEVC =
    vCodecRaw.includes("hevc") ||
    vCodecRaw.includes("h265") ||
    vCodecRaw.includes("hvc1") ||
    vCodecRaw.includes("hev1") ||
    vCodecRaw.includes("x265");
  const isAV1 = vCodecRaw.includes("av1") || vCodecRaw.includes("av01");
  const isVP9 = vCodecRaw.includes("vp9") || vCodecRaw.includes("vp09");
  const isVP8 = vCodecRaw.includes("vp8") || vCodecRaw.includes("v_vp8");
  const isMPEG4 =
    vCodecRaw.includes("mpeg4") || vCodecRaw.includes("xvid") || vCodecRaw.includes("divx");
  const isMPEG2 = vCodecRaw.includes("mpeg2") || vCodecRaw.includes("mpg2");

  const isAAC = aCodecRaw.includes("aac") || aCodecRaw.includes("mp4a");
  const isMP3 = aCodecRaw.includes("mp3") || aCodecRaw.includes("lame");
  const isAC3 = aCodecRaw.includes("ac3") || aCodecRaw.includes("eac3");
  const isOpus = aCodecRaw.includes("opus");
  const isVorbis = aCodecRaw.includes("vorbis");
  const isPCM = aCodecRaw.includes("pcm") || aCodecRaw.includes("wav");
  const isNoAudio = aCodecRaw.includes("none") || aCodecRaw.includes("mute") || !aCodecRaw;

  // Case 1: Same input and output container format
  if (inFmt === outFmt) {
    return {
      isCandidate: true,
      explanation:
        "Fast 100% loss-less stream copy applied: input and output container formats are identical.",
    };
  }

  // Case 2: MP3 extraction
  if (outFmt === "MP3") {
    if (isMP3) {
      return {
        isCandidate: true,
        explanation:
          "Fast 100% loss-less stream copy applied: extracting native MP3 audio stream directly.",
      };
    }
    return {
      isCandidate: false,
      explanation: "Optimized audio encoding active: transcoding audio stream into 256kbps MP3.",
    };
  }

  // Case 3: GIF output (always requires palette & frame sequence)
  if (outFmt === "GIF") {
    return {
      isCandidate: false,
      explanation:
        "Optimized animation rendering active: generating GIF color palette and frame sequence.",
    };
  }

  // Case 4: MKV Container (Matroska natively accepts almost all codecs)
  if (outFmt === "MKV") {
    return {
      isCandidate: true,
      explanation:
        "Fast 100% loss-less stream copy (remuxing) applied: Matroska (MKV) container natively accepts source video and audio streams.",
    };
  }

  // Case 5: MP4 / MOV / M4V Containers
  if (["MP4", "MOV", "M4V"].includes(outFmt)) {
    const isMP4Family = (fmt: string) => ["MP4", "MOV", "M4V", "3GP"].includes(fmt);
    if (isMP4Family(inFmt)) {
      return {
        isCandidate: true,
        explanation: `Fast 100% loss-less stream copy (remuxing) applied: source ${inFmt} streams are natively compatible with ${outFmt} container.`,
      };
    }

    const vOk = isH264 || isHEVC || isAV1 || isVP9 || isMPEG4;
    const aOk = isAAC || isMP3 || isAC3 || isOpus || isNoAudio;

    if (vOk && aOk) {
      return {
        isCandidate: true,
        explanation: `Fast 100% loss-less stream copy (remuxing) applied: source video and audio streams are natively compatible with ${outFmt} container.`,
      };
    }

    return {
      isCandidate: false,
      explanation: `Optimized re-encoding active: source codecs require transcoding to be compatible with ${outFmt} container.`,
    };
  }

  // Case 6: WEBM Container
  if (outFmt === "WEBM") {
    const vOk = isVP8 || isVP9 || isAV1;
    const aOk = isOpus || isVorbis || isNoAudio;

    if (vOk && aOk) {
      return {
        isCandidate: true,
        explanation:
          "Fast 100% loss-less stream copy applied: source streams are natively compatible with WebM container.",
      };
    }

    return {
      isCandidate: false,
      explanation:
        "Optimized encoding active: source streams transcoded to WebM-compatible VP9/Opus codecs.",
    };
  }

  // Case 7: AVI Container
  if (outFmt === "AVI") {
    const vOk = isMPEG4 || isH264;
    const aOk = isMP3 || isPCM || isAC3 || isNoAudio;

    if (vOk && aOk) {
      return {
        isCandidate: true,
        explanation:
          "Fast 100% loss-less stream copy applied: source streams are natively compatible with AVI container.",
      };
    }

    return {
      isCandidate: false,
      explanation:
        "Optimized encoding active: source streams transcoded to AVI-compatible MPEG-4/MP3 codecs.",
    };
  }

  // Case 8: TS Container
  if (outFmt === "TS") {
    const vOk = isH264 || isHEVC || isMPEG2;
    const aOk = isAAC || isMP3 || isAC3 || isNoAudio;

    if (vOk && aOk) {
      return {
        isCandidate: true,
        explanation: "Fast 100% loss-less stream copy applied for MPEG-TS transport container.",
      };
    }

    return {
      isCandidate: false,
      explanation:
        "Optimized encoding active: transcoding streams for MPEG-TS transport container.",
    };
  }

  return {
    isCandidate: false,
    explanation: `Optimized re-encoding active to transcode streams into ${outFmt} container format safely.`,
  };
}

function buildFormatFallbackArgs(
  inputVirtualName: string,
  outputVirtualName: string,
  outputFormat: SupportedOutputFormat,
): string[] {
  switch (outputFormat) {
    case "WEBM":
      return [
        "-i",
        inputVirtualName,
        "-vf",
        "scale=trunc(iw/2)*2:trunc(ih/2)*2",
        "-c:v",
        "libvpx-vp9",
        "-deadline",
        "realtime",
        "-cpu-used",
        "8",
        "-tile-columns",
        "2",
        "-row-mt",
        "1",
        "-crf",
        "28",
        "-b:v",
        "0",
        "-pix_fmt",
        "yuv420p",
        "-c:a",
        "libopus",
        "-y",
        outputVirtualName,
      ];
    case "MP3":
      return [
        "-i",
        inputVirtualName,
        "-vn",
        "-c:a",
        "libmp3lame",
        "-b:a",
        "256k",
        "-y",
        outputVirtualName,
      ];
    case "GIF":
      return [
        "-i",
        inputVirtualName,
        "-vf",
        "fps=15,scale=trunc(iw/2)*2:trunc(ih/2)*2:flags=lanczos",
        "-an",
        "-y",
        outputVirtualName,
      ];
    case "AVI":
      return [
        "-i",
        inputVirtualName,
        "-c:v",
        "mpeg4",
        "-q:v",
        "4",
        "-c:a",
        "mp3",
        "-b:a",
        "192k",
        "-y",
        outputVirtualName,
      ];
    case "WMV":
      return [
        "-i",
        inputVirtualName,
        "-c:v",
        "wmv2",
        "-q:v",
        "4",
        "-c:a",
        "wmav2",
        "-b:a",
        "192k",
        "-y",
        outputVirtualName,
      ];
    default:
      return [
        "-i",
        inputVirtualName,
        "-vf",
        "scale=trunc(iw/2)*2:trunc(ih/2)*2",
        "-c:v",
        "libx264",
        "-preset",
        "superfast",
        "-crf",
        "20",
        "-pix_fmt",
        "yuv420p",
        "-c:a",
        "aac",
        "-b:a",
        "192k",
        "-y",
        outputVirtualName,
      ];
  }
}

function buildFFmpegArgs(
  inputFilename: string,
  outputFilename: string,
  outputFormat: SupportedOutputFormat,
  advanced?: AdvancedSettings,
  _perfProfile?: DevicePerformanceProfile,
): string[] {
  const args: string[] = ["-i", inputFilename];
  const preset = advanced?.qualityPreset || "Balanced";

  // Codec presets optimized for ultra-fast conversion speed while maintaining high quality
  let h264Preset = "superfast";
  let h264Crf = "20";

  let h265Preset = "ultrafast";
  let h265Crf = "23";

  let vp9Deadline = "realtime";
  let vp9CpuUsed = "8";
  let vp9Crf = "28";

  if (preset === "High Quality") {
    h264Preset = "fast";
    h264Crf = "18";
    h265Preset = "superfast";
    h265Crf = "20";
    vp9Deadline = "realtime";
    vp9CpuUsed = "5";
    vp9Crf = "22";
  } else if (preset === "Small Size") {
    h264Preset = "ultrafast";
    h264Crf = "25";
    h265Preset = "ultrafast";
    h265Crf = "28";
    vp9Deadline = "realtime";
    vp9CpuUsed = "8";
    vp9Crf = "32";
  }

  // 1. Audio-only (MP3)
  if (outputFormat === "MP3") {
    args.push("-vn");
    if (advanced?.audioQuality === "Mute Audio") {
      args.push("-an");
    } else {
      let audioBitrate = "256k"; // Default Balanced MP3 bitrate
      if (advanced?.audioQuality?.includes("kbps")) {
        audioBitrate = advanced.audioQuality.replace(" ", "");
      } else if (preset === "High Quality") {
        audioBitrate = "320k";
      } else if (preset === "Small Size") {
        audioBitrate = "160k";
      }
      args.push("-c:a", "libmp3lame", "-b:a", audioBitrate);
    }
    args.push("-y", outputFilename);
    return args;
  }

  // 2. GIF format
  if (outputFormat === "GIF") {
    let fps = 15;
    if (advanced?.fps && advanced.fps !== "Same as Original") {
      const parsed = parseInt(advanced.fps);
      if (!isNaN(parsed)) fps = parsed;
    } else if (preset === "Small Size") {
      fps = 10;
    } else if (preset === "High Quality") {
      fps = 24;
    }

    let scaleFilter = "scale=trunc(iw/2)*2:trunc(ih/2)*2:flags=lanczos";
    if (advanced?.resolution && advanced.resolution !== "Same as Original") {
      if (advanced.resolution.includes("1080p")) {
        scaleFilter = "scale=1920:-1:flags=lanczos";
      } else if (advanced.resolution.includes("720p")) {
        scaleFilter = "scale=1280:-1:flags=lanczos";
      } else if (advanced.resolution.includes("480p")) {
        scaleFilter = "scale=854:-1:flags=lanczos";
      } else if (advanced.resolution.includes("360p")) {
        scaleFilter = "scale=640:-1:flags=lanczos";
      }
    }

    args.push("-vf", `fps=${fps},${scaleFilter}`);
    args.push("-an");
    args.push("-y", outputFilename);
    return args;
  }

  // 3. Resolution & Filters
  const videoFilters: string[] = [];
  if (advanced?.resolution && advanced.resolution !== "Same as Original") {
    if (advanced.resolution.includes("4K")) videoFilters.push("scale=3840:-2");
    else if (advanced.resolution.includes("1080p")) videoFilters.push("scale=1920:-2");
    else if (advanced.resolution.includes("720p")) videoFilters.push("scale=1280:-2");
    else if (advanced.resolution.includes("480p")) videoFilters.push("scale=854:-2");
    else if (advanced.resolution.includes("360p")) videoFilters.push("scale=640:-2");
  } else {
    // Keep exact original resolution while guaranteeing even dimensions for H.264 / HEVC yuv420p
    videoFilters.push("scale=trunc(iw/2)*2:trunc(ih/2)*2");
  }

  if (videoFilters.length > 0) {
    args.push("-vf", videoFilters.join(","));
  }

  // 4. Frame rate (Preserve original unless user explicitly requests override)
  if (advanced?.fps && advanced.fps !== "Same as Original") {
    const fpsVal = parseInt(advanced.fps);
    if (!isNaN(fpsVal)) {
      args.push("-r", fpsVal.toString());
    }
  }

  // 5. Codec & Quality Configuration
  const userCodec = advanced?.videoCodec || "Auto (Recommended)";
  const customBitrate = advanced?.bitrate && advanced.bitrate !== "Auto";

  switch (outputFormat) {
    case "MP4":
    case "M4V":
    case "MOV":
    case "MKV":
    case "TS": {
      if (userCodec.includes("H.265") || userCodec.includes("HEVC")) {
        args.push("-c:v", "libx265", "-preset", h265Preset);
        if (!customBitrate) args.push("-crf", h265Crf);
      } else if (userCodec.includes("VP9")) {
        args.push(
          "-c:v",
          "libvpx-vp9",
          "-deadline",
          vp9Deadline,
          "-cpu-used",
          vp9CpuUsed,
          "-b:v",
          "0",
        );
        if (!customBitrate) args.push("-crf", vp9Crf);
      } else {
        // High fidelity H.264 default
        args.push("-c:v", "libx264", "-preset", h264Preset, "-pix_fmt", "yuv420p");
        if (!customBitrate) args.push("-crf", h264Crf);
      }

      if (outputFormat === "MP4" || outputFormat === "MOV" || outputFormat === "M4V") {
        args.push("-movflags", "+faststart");
      }
      if (outputFormat === "TS") {
        args.push("-f", "mpegts");
      }
      break;
    }

    case "WEBM": {
      args.push(
        "-c:v",
        "libvpx-vp9",
        "-deadline",
        vp9Deadline,
        "-cpu-used",
        vp9CpuUsed,
        "-b:v",
        "0",
        "-pix_fmt",
        "yuv420p",
        "-tile-columns",
        "2",
        "-row-mt",
        "1",
        "-c:a",
        "libopus",
      );
      if (!customBitrate) args.push("-crf", vp9Crf);
      break;
    }

    case "AVI":
      args.push(
        "-c:v",
        "mpeg4",
        "-q:v",
        preset === "High Quality" ? "3" : preset === "Small Size" ? "8" : "5",
        "-c:a",
        "mp3",
      );
      break;

    case "WMV":
      args.push(
        "-c:v",
        "wmv2",
        "-q:v",
        preset === "High Quality" ? "3" : preset === "Small Size" ? "8" : "5",
        "-c:a",
        "wmav2",
      );
      break;

    case "FLV":
      args.push(
        "-c:v",
        "flv1",
        "-q:v",
        preset === "High Quality" ? "3" : preset === "Small Size" ? "8" : "5",
        "-c:a",
        "mp3",
      );
      break;

    case "MPEG":
      args.push(
        "-c:v",
        "mpeg2video",
        "-q:v",
        preset === "High Quality" ? "3" : preset === "Small Size" ? "8" : "5",
        "-c:a",
        "mp2",
      );
      break;

    case "OGV":
      args.push(
        "-c:v",
        "libtheora",
        "-q:v",
        preset === "High Quality" ? "8" : preset === "Small Size" ? "4" : "6",
        "-c:a",
        "libvorbis",
      );
      break;

    case "3GP":
      args.push(
        "-s",
        "352x288",
        "-r",
        "15",
        "-c:v",
        "h263",
        "-c:a",
        "amr_nb",
        "-ar",
        "8000",
        "-ac",
        "1",
      );
      break;

    default:
      args.push("-c:v", "libx264", "-preset", h264Preset, "-crf", h264Crf);
      break;
  }

  if (customBitrate && advanced?.bitrate) {
    const bitVal = advanced.bitrate.replace(" ", "").toLowerCase();
    args.push("-b:v", bitVal);
  }

  // Audio settings (Preserve high audio fidelity)
  if (outputFormat !== "3GP") {
    if (advanced?.audioQuality === "Mute Audio") {
      args.push("-an");
    } else {
      if (!args.includes("-c:a")) {
        args.push("-c:a", "aac");
      }
      if (advanced?.audioQuality?.includes("kbps")) {
        args.push("-b:a", advanced.audioQuality.replace(" ", ""));
      } else {
        let aBit = "192k"; // Default Balanced audio bitrate
        if (preset === "High Quality") aBit = "256k";
        else if (preset === "Small Size") aBit = "128k";
        args.push("-b:a", aBit);
      }
    }
  }

  args.push("-y", outputFilename);
  return args;
}

self.onmessage = async (event: MessageEvent) => {
  const { type, id, ...data } = event.data || {};

  if (type === "INIT") {
    try {
      await loadFFmpeg();
      self.postMessage({ type: "INIT_SUCCESS" });
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "Initialization failed.";
      self.postMessage({ type: "INIT_ERROR", error: errMsg });
    }
    return;
  }

  if (type === "CONVERT") {
    const {
      inputBuffer,
      inputFilename,
      outputFormat,
      advanced,
      metadata,
      performanceProfile,
      existingFilenames,
    } = data as {
      inputBuffer: ArrayBuffer;
      inputFilename: string;
      outputFormat: SupportedOutputFormat;
      advanced?: AdvancedSettings;
      metadata: VideoMetadata;
      performanceProfile?: DevicePerformanceProfile;
      existingFilenames?: string[];
    };

    const startTime = performance.now();
    const inputExt = metadata.format ? metadata.format.toLowerCase() : "mp4";
    const inputVirtualName = `in_${Date.now()}_${Math.random().toString(36).substring(2, 6)}.${inputExt}`;
    const targetExt = outputFormat.toLowerCase();
    const outputVirtualName = `out_${Date.now()}_${Math.random().toString(36).substring(2, 6)}.${targetExt}`;

    const originalName = inputFilename || metadata.filename || "video";
    const finalDownloadFilename = getUniqueOutputFilename(
      originalName,
      outputFormat,
      existingFilenames,
    );

    let ffmpeg: FFmpeg;
    try {
      ffmpeg = await loadFFmpeg();
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "FFmpeg engine unavailable.";
      self.postMessage({ type: "CONVERT_ERROR", id, error: errMsg });
      return;
    }

    let isRemuxing = false;
    let lastProgressTime = 0;
    let lastPct = -1;
    const threadsCount = typeof navigator !== "undefined" ? navigator.hardwareConcurrency || 4 : 4;

    const streamCopyAnalysis = checkStreamCopyCandidate(inputExt, outputFormat, metadata, advanced);
    const isStreamCopyCandidate = streamCopyAnalysis.isCandidate;

    let conversionType: "Stream Copy" | "Full Re-Encode" = isStreamCopyCandidate
      ? "Stream Copy"
      : "Full Re-Encode";

    let explanation: string = streamCopyAnalysis.explanation;

    const progressHandler = ({ progress, time }: { progress: number; time: number }) => {
      let pct = Math.round(progress * 100);
      if (pct > 99) pct = 99;

      if ((isNaN(pct) || pct <= 0) && metadata.duration > 0 && time > 0) {
        const calculatedPct = Math.round((time / 1000000 / metadata.duration) * 100);
        pct = Math.min(99, Math.max(1, calculatedPct));
      }

      const now = performance.now();
      if (pct === 100 || now - lastProgressTime >= 80 || Math.abs(pct - lastPct) >= 2) {
        lastProgressTime = now;
        lastPct = pct;

        const elapsedSec = (now - startTime) / 1000;
        const timeSec = time ? time / 1000000 : 0;
        const remainingSec =
          pct > 0 && pct < 100 ? Math.max(1, Math.round(((100 - pct) / pct) * elapsedSec)) : 0;

        let stage = "Converting Video";
        if (pct < 5) {
          stage = "Reading Metadata";
        } else if (pct < 15) {
          stage = "Preparing Conversion";
        } else if (isRemuxing) {
          stage = "Optimizing Streams";
        } else if (pct >= 15 && pct < 82) {
          stage = "Converting Video";
        } else if (pct >= 82 && pct < 95) {
          stage = "Processing Audio";
        } else {
          stage = "Writing Output File";
        }

        const speedRatioNum = elapsedSec > 0.3 && timeSec > 0 ? timeSec / elapsedSec : 0;
        const speedStr = speedRatioNum > 0 ? `${speedRatioNum.toFixed(1)}x` : undefined;

        const baseFps = metadata.fps ? parseFloat(metadata.fps) : 30;
        const liveFps = speedRatioNum > 0 ? Math.round(baseFps * speedRatioNum) : undefined;

        const processedBytes = (inputBuffer.byteLength * pct) / 100;
        const throughput =
          elapsedSec > 0.3
            ? Math.round((processedBytes / (1024 * 1024) / elapsedSec) * 10) / 10
            : undefined;

        self.postMessage({
          type: "PROGRESS",
          id,
          pct,
          elapsedSec,
          remainingSec,
          timeSec,
          stage,
          fps: liveFps,
          speed: speedStr,
          throughputMBs: throughput,
          conversionType,
          explanation,
          threads: threadsCount,
        });
      }
    };

    try {
      self.postMessage({
        type: "PROGRESS",
        id,
        pct: 1,
        elapsedSec: 0,
        remainingSec: 0,
        timeSec: 0,
        stage: "Reading Metadata",
        conversionType,
        explanation,
        threads: threadsCount,
      });

      await ffmpeg.writeFile(inputVirtualName, new Uint8Array(inputBuffer));
      ffmpeg.on("progress", progressHandler);

      self.postMessage({
        type: "PROGRESS",
        id,
        pct: 5,
        elapsedSec: (performance.now() - startTime) / 1000,
        remainingSec: 0,
        timeSec: 0,
        stage: "Preparing Conversion",
        conversionType,
        explanation,
        threads: threadsCount,
      });

      let converted = false;

      if (isStreamCopyCandidate) {
        isRemuxing = true;
        self.postMessage({
          type: "PROGRESS",
          id,
          pct: 10,
          elapsedSec: (performance.now() - startTime) / 1000,
          remainingSec: 0,
          timeSec: 0,
          stage: "Optimizing Streams",
          conversionType: "Stream Copy",
          explanation: "Fast conversion because the video and audio codecs are already compatible.",
          threads: threadsCount,
        });

        try {
          const copyArgs = ["-i", inputVirtualName, "-c", "copy"];
          if (["MP4", "MOV", "M4V"].includes(outputFormat)) {
            copyArgs.push("-movflags", "+faststart");
          }
          copyArgs.push("-y", outputVirtualName);

          const copyExitCode = await ffmpeg.exec(copyArgs);
          if (copyExitCode === 0) {
            converted = true;
          } else {
            try {
              await ffmpeg.deleteFile(outputVirtualName);
            } catch {
              // ignore
            }
          }
        } catch {
          converted = false;
          isRemuxing = false;
          try {
            await ffmpeg.deleteFile(outputVirtualName);
          } catch {
            // ignore
          }
        }
      }

      if (!converted) {
        isRemuxing = false;
        conversionType = "Full Re-Encode";
        explanation =
          "Full re-encoding is active because container stream copy was bypassed or required codec transcoding.";

        try {
          await ffmpeg.deleteFile(outputVirtualName);
        } catch {
          // ignore
        }

        const ffmpegArgs = buildFFmpegArgs(
          inputVirtualName,
          outputVirtualName,
          outputFormat,
          advanced,
          performanceProfile,
        );

        let exitCode = await ffmpeg.exec(ffmpegArgs);

        if (exitCode !== 0) {
          // Safe fallback retry without faststart or complex settings
          try {
            await ffmpeg.deleteFile(outputVirtualName);
          } catch {
            // ignore
          }

          const fallbackArgs = buildFormatFallbackArgs(
            inputVirtualName,
            outputVirtualName,
            outputFormat,
          );
          exitCode = await ffmpeg.exec(fallbackArgs);
        }

        if (exitCode !== 0) {
          throw new Error(`FFmpeg engine returned exit code ${exitCode}.`);
        }
      }

      self.postMessage({
        type: "PROGRESS",
        id,
        pct: 96,
        elapsedSec: (performance.now() - startTime) / 1000,
        remainingSec: 0,
        timeSec: metadata.duration,
        stage: "Preparing Download",
        conversionType,
        explanation,
        threads: threadsCount,
      });

      const outputData = (await ffmpeg.readFile(outputVirtualName)) as Uint8Array;
      if (!outputData || outputData.byteLength < 512) {
        throw new Error("Conversion produced an invalid or empty file (0 bytes).");
      }
      const buffer = outputData.buffer;

      self.postMessage({
        type: "PROGRESS",
        id,
        pct: 98,
        elapsedSec: (performance.now() - startTime) / 1000,
        remainingSec: 0,
        timeSec: metadata.duration,
        stage: "Cleaning Temporary Files",
        conversionType,
        explanation,
        threads: threadsCount,
      });

      self.postMessage(
        {
          type: "CONVERT_SUCCESS",
          id,
          outputBuffer: buffer,
          outputFilename: finalDownloadFilename,
          conversionType,
          explanation,
        },
        // @ts-expect-error transfer list
        [buffer],
      );
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "Video conversion failed in WebWorker.";
      self.postMessage({ type: "CONVERT_ERROR", id, error: errMsg });
    } finally {
      ffmpeg.off("progress", progressHandler);
      try {
        await ffmpeg.deleteFile(inputVirtualName);
      } catch (e) {
        // Ignore deletion errors for missing files
        console.debug("Virtual input file delete ignored:", e);
      }
      try {
        await ffmpeg.deleteFile(outputVirtualName);
      } catch (e) {
        // Ignore deletion errors for missing files
        console.debug("Virtual output file delete ignored:", e);
      }
    }
  }
};
