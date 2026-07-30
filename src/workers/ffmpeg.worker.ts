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

      const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm";

      self.postMessage({
        type: "INIT_PROGRESS",
        message: "Loading cached WASM core...",
      });

      const [coreURL, wasmURL] = await Promise.all([
        getCachedUrl(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
        getCachedUrl(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
      ]);

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

function buildFFmpegArgs(
  inputFilename: string,
  outputFilename: string,
  outputFormat: SupportedOutputFormat,
  advanced?: AdvancedSettings,
  perfProfile?: DevicePerformanceProfile,
): string[] {
  const args: string[] = ["-i", inputFilename];
  const preset = advanced?.qualityPreset || "Balanced";
  const fastPreset = perfProfile?.recommendedPreset || "ultrafast";

  // 1. Audio-only (MP3)
  if (outputFormat === "MP3") {
    args.push("-vn");
    if (advanced?.audioQuality === "Mute Audio") {
      args.push("-an");
    } else {
      let audioBitrate = "128k";
      if (advanced?.audioQuality?.includes("kbps")) {
        audioBitrate = advanced.audioQuality.replace(" ", "");
      } else if (preset === "High Quality") {
        audioBitrate = "192k";
      } else if (preset === "Small Size") {
        audioBitrate = "96k";
      }
      args.push("-c:a", "libmp3lame", "-b:a", audioBitrate);
    }
    args.push("-y", outputFilename);
    return args;
  }

  // 2. GIF format
  if (outputFormat === "GIF") {
    let fps = 12;
    if (advanced?.fps && advanced.fps !== "Same as Original") {
      const parsed = parseInt(advanced.fps);
      if (!isNaN(parsed)) fps = parsed;
    } else if (preset === "Small Size") {
      fps = 10;
    } else if (preset === "High Quality") {
      fps = 15;
    }

    let scaleFilter = "scale=480:-1:flags=fast_bilinear";
    if (advanced?.resolution && advanced.resolution !== "Same as Original") {
      if (advanced.resolution.includes("720p")) {
        scaleFilter = "scale=1280:-1:flags=fast_bilinear";
      } else if (advanced.resolution.includes("480p")) {
        scaleFilter = "scale=854:-1:flags=fast_bilinear";
      } else if (advanced.resolution.includes("360p")) {
        scaleFilter = "scale=640:-1:flags=fast_bilinear";
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
  }

  if (videoFilters.length > 0) {
    args.push("-vf", videoFilters.join(","));
  }

  // 4. Frame rate
  if (advanced?.fps && advanced.fps !== "Same as Original") {
    const fpsVal = parseInt(advanced.fps);
    if (!isNaN(fpsVal)) {
      args.push("-r", fpsVal.toString());
    }
  }

  // 5. Codec & CRF / Bitrate Configuration
  const userCodec = advanced?.videoCodec || "Auto (Recommended)";
  const customBitrate = advanced?.bitrate && advanced.bitrate !== "Auto";

  let h264Crf = "24";
  if (preset === "High Quality") h264Crf = "20";
  else if (preset === "Small Size") h264Crf = "28";

  let vp9Crf = "32";
  if (preset === "High Quality") vp9Crf = "24";
  else if (preset === "Small Size") vp9Crf = "40";

  switch (outputFormat) {
    case "MP4":
    case "M4V":
    case "MOV":
    case "MKV":
    case "TS": {
      if (userCodec.includes("H.265") || userCodec.includes("HEVC")) {
        args.push("-c:v", "libx265", "-preset", fastPreset);
        if (!customBitrate) args.push("-crf", (parseInt(h264Crf) + 2).toString());
      } else if (userCodec.includes("VP9")) {
        args.push("-c:v", "libvpx-vp9", "-deadline", "realtime", "-cpu-used", "8", "-b:v", "0");
        if (!customBitrate) args.push("-crf", vp9Crf);
      } else {
        // Fast H.264 default
        args.push("-c:v", "libx264", "-preset", fastPreset, "-pix_fmt", "yuv420p");
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
        "realtime",
        "-cpu-used",
        "8",
        "-b:v",
        "0",
        "-c:a",
        "libvorbis",
      );
      if (!customBitrate) args.push("-crf", vp9Crf);
      break;
    }

    case "AVI":
      args.push(
        "-c:v",
        "mpeg4",
        "-q:v",
        preset === "High Quality" ? "4" : preset === "Small Size" ? "12" : "7",
        "-c:a",
        "mp3",
      );
      break;

    case "WMV":
      args.push(
        "-c:v",
        "wmv2",
        "-q:v",
        preset === "High Quality" ? "4" : preset === "Small Size" ? "12" : "7",
        "-c:a",
        "wmav2",
      );
      break;

    case "FLV":
      args.push(
        "-c:v",
        "flv1",
        "-q:v",
        preset === "High Quality" ? "4" : preset === "Small Size" ? "12" : "7",
        "-c:a",
        "mp3",
      );
      break;

    case "MPEG":
      args.push(
        "-c:v",
        "mpeg2video",
        "-q:v",
        preset === "High Quality" ? "4" : preset === "Small Size" ? "12" : "8",
        "-c:a",
        "mp2",
      );
      break;

    case "OGV":
      args.push(
        "-c:v",
        "libtheora",
        "-q:v",
        preset === "High Quality" ? "7" : preset === "Small Size" ? "3" : "5",
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
      args.push("-c:v", "libx264", "-preset", fastPreset, "-crf", h264Crf);
      break;
  }

  if (customBitrate && advanced?.bitrate) {
    const bitVal = advanced.bitrate.replace(" ", "").toLowerCase();
    args.push("-b:v", bitVal);
  }

  // Audio settings
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
        let aBit = "128k";
        if (preset === "High Quality") aBit = "192k";
        else if (preset === "Small Size") aBit = "96k";
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
        const remainingSec =
          pct > 0 && pct < 100 ? Math.round(((100 - pct) / pct) * elapsedSec) : 0;

        let stage = "Processing video...";
        if (pct < 5) {
          stage = "Preparing virtual filesystem...";
        } else if (isRemuxing) {
          stage = "Fast remuxing (no quality loss)...";
        } else if (pct >= 98) {
          stage = "Finalizing output container...";
        } else {
          stage = `Encoding (${advanced?.qualityPreset || "Balanced"} preset)...`;
        }

        self.postMessage({
          type: "PROGRESS",
          id,
          pct,
          elapsedSec,
          remainingSec,
          timeSec: time ? time / 1000000 : 0,
          stage,
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
        stage: "Writing input file to worker RAM...",
      });

      await ffmpeg.writeFile(inputVirtualName, new Uint8Array(inputBuffer));
      ffmpeg.on("progress", progressHandler);

      let converted = false;
      const isDefaultSettings =
        (!advanced?.resolution || advanced.resolution === "Same as Original") &&
        (!advanced?.fps || advanced.fps === "Same as Original") &&
        (!advanced?.videoCodec || advanced.videoCodec.includes("Auto")) &&
        (!advanced?.bitrate || advanced.bitrate === "Auto") &&
        (!advanced?.audioQuality || advanced.audioQuality === "Auto");

      const streamCopyContainers = ["MP4", "MOV", "MKV", "M4V", "TS"];
      const isStreamCopyCandidate =
        isDefaultSettings &&
        streamCopyContainers.includes(inputExt.toUpperCase()) &&
        streamCopyContainers.includes(outputFormat);

      if (isStreamCopyCandidate) {
        isRemuxing = true;
        try {
          const copyArgs = ["-i", inputVirtualName, "-c", "copy"];
          if (["MP4", "MOV", "M4V"].includes(outputFormat)) {
            copyArgs.push("-movflags", "+faststart");
          }
          copyArgs.push("-y", outputVirtualName);

          const copyExitCode = await ffmpeg.exec(copyArgs);
          if (copyExitCode === 0) {
            converted = true;
          }
        } catch {
          converted = false;
          isRemuxing = false;
        }
      }

      if (!converted) {
        isRemuxing = false;
        const ffmpegArgs = buildFFmpegArgs(
          inputVirtualName,
          outputVirtualName,
          outputFormat,
          advanced,
          performanceProfile,
        );

        const exitCode = await ffmpeg.exec(ffmpegArgs);
        if (exitCode !== 0) {
          throw new Error(`FFmpeg engine returned exit code ${exitCode}.`);
        }
      }

      self.postMessage({
        type: "PROGRESS",
        id,
        pct: 99,
        elapsedSec: (performance.now() - startTime) / 1000,
        remainingSec: 0,
        timeSec: metadata.duration,
        stage: "Reading converted output...",
      });

      const outputData = (await ffmpeg.readFile(outputVirtualName)) as Uint8Array;
      const buffer = outputData.buffer;

      self.postMessage(
        {
          type: "CONVERT_SUCCESS",
          id,
          outputBuffer: buffer,
          outputFilename: finalDownloadFilename,
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
