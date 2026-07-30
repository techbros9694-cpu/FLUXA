import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import {
  Upload,
  Sparkles,
  Download,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  ArrowRight,
  Film,
  Globe,
  Clapperboard,
  Tv,
  Disc,
  Image,
  Music,
  RefreshCw,
  FileVideo,
  AlertCircle,
  Smartphone,
  Info,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MagneticButton } from "./MagneticButton";
import { useConverter } from "@/hooks/useConverter";
import { SupportedOutputFormat } from "@/types/converter";
import { toast } from "sonner";

interface OutputCardConfig {
  id: SupportedOutputFormat;
  title: string;
  recommended?: boolean;
  desc: string;
  compatibility: string;
  icon: typeof Film;
  buttonLabel: string;
  defaultCodec: string;
}

const ALL_OUTPUT_FORMATS: OutputCardConfig[] = [
  {
    id: "MP4",
    title: "MP4",
    recommended: true,
    desc: "Most compatible for phones, PCs and social media.",
    compatibility: "Universal compatibility (iOS, Android, Windows, Mac, Web)",
    icon: Film,
    buttonLabel: "✨ Convert to MP4",
    defaultCodec: "H.264 / AAC",
  },
  {
    id: "WEBM",
    title: "WEBM",
    desc: "Smaller files, perfect for websites and modern browsers.",
    compatibility: "Optimized for Chrome, Firefox, Edge, HTML5 video",
    icon: Globe,
    buttonLabel: "🚀 Convert to WEBM",
    defaultCodec: "VP8 / Vorbis",
  },
  {
    id: "MKV",
    title: "MKV",
    desc: "Keeps high quality, multiple tracks & subtitles.",
    compatibility: "Great for VLC, desktop media centers & archival",
    icon: Clapperboard,
    buttonLabel: "🎥 Convert to MKV",
    defaultCodec: "H.264 / AAC",
  },
  {
    id: "MOV",
    title: "MOV",
    desc: "Native format for Apple ecosystem & QuickTime.",
    compatibility: "Ideal for Final Cut Pro, iMovie, Mac & iPhone",
    icon: Tv,
    buttonLabel: "🍎 Convert to MOV",
    defaultCodec: "H.264 / AAC",
  },
  {
    id: "AVI",
    title: "AVI",
    desc: "Legacy format for older video players and TVs.",
    compatibility: "Compatible with older media players and Windows",
    icon: Disc,
    buttonLabel: "📼 Convert to AVI",
    defaultCodec: "MPEG-4 / MP3",
  },
  {
    id: "WMV",
    title: "WMV",
    desc: "Windows Media Video for legacy Windows software.",
    compatibility: "Native for Windows Media Player & Office tools",
    icon: Disc,
    buttonLabel: "🪟 Convert to WMV",
    defaultCodec: "WMV2 / WMA",
  },
  {
    id: "FLV",
    title: "FLV",
    desc: "Flash Video container for retro video playback.",
    compatibility: "Legacy flash video streams",
    icon: FileVideo,
    buttonLabel: "⚡ Convert to FLV",
    defaultCodec: "FLV1 / MP3",
  },
  {
    id: "MPEG",
    title: "MPEG",
    desc: "Standard MPEG video format for DVDs and TV broadcast.",
    compatibility: "Wide DVD player & hardware support",
    icon: Tv,
    buttonLabel: "📺 Convert to MPEG",
    defaultCodec: "MPEG-2 / MP2",
  },
  {
    id: "M4V",
    title: "M4V",
    desc: "iTunes & Apple ecosystem video format.",
    compatibility: "Optimized for Apple TV, iTunes, iPhone",
    icon: Film,
    buttonLabel: "📱 Convert to M4V",
    defaultCodec: "H.264 / AAC",
  },
  {
    id: "OGV",
    title: "OGV",
    desc: "Open-source Ogg video container.",
    compatibility: "Patent-free open format for HTML5",
    icon: Globe,
    buttonLabel: "🌐 Convert to OGV",
    defaultCodec: "Theora / Vorbis",
  },
  {
    id: "TS",
    title: "TS",
    desc: "MPEG Transport Stream for video streaming.",
    compatibility: "Used in broadcast TV & HLS streaming",
    icon: Disc,
    buttonLabel: "📡 Convert to TS",
    defaultCodec: "H.264 / MPEGTS",
  },
  {
    id: "3GP",
    title: "3GP",
    desc: "Ultra-compact video format for older mobile phones.",
    compatibility: "Legacy mobile devices & feature phones",
    icon: Smartphone,
    buttonLabel: "📱 Convert to 3GP",
    defaultCodec: "H.263 / AMR",
  },
  {
    id: "GIF",
    title: "GIF",
    desc: "Animated looping image with no audio track.",
    icon: Image,
    compatibility: "Shareable anywhere as an image badge",
    buttonLabel: "🎬 Convert to GIF",
    defaultCodec: "Animated GIF",
  },
  {
    id: "MP3",
    title: "MP3",
    desc: "Extract high quality audio track only.",
    compatibility: "Plays on 100% of audio devices & players",
    icon: Music,
    buttonLabel: "🎵 Extract MP3",
    defaultCodec: "320 kbps MP3",
  },
];

const DROP_PROMPTS = [
  "Drag your video here.",
  "Throw it gently.",
  "100% Client-Side. Your file never leaves your device.",
  "Drop your masterpiece.",
];

const SCANNING_MESSAGES = [
  "Scanning video stream...",
  "Reading container metadata...",
  "Detecting resolution & frame rate...",
  "Configuring FFmpeg presets...",
];

const RESOLUTIONS = ["Same as Original", "4K (2160p)", "1080p", "720p", "480p", "360p"];
const CODECS = ["Auto (Recommended)", "H.264", "H.265 / HEVC", "VP9", "AV1", "ProRes"];
const BITRATES = ["Auto", "16 Mbps", "12 Mbps", "8 Mbps", "4 Mbps", "2 Mbps"];
const FPS_OPTIONS = ["Same as Original", "60 FPS", "30 FPS", "24 FPS"];
const AUDIO_QUALITIES = ["Original", "320 kbps", "256 kbps", "192 kbps", "128 kbps", "Mute Audio"];

export function ConverterPanel() {
  const {
    step,
    metadata,
    selectedFormat,
    setSelectedFormat,
    advanced,
    setAdvanced,
    showAdvanced,
    setShowAdvanced,
    engineLoading,
    engineStatus,
    progress,
    result,
    error,
    handleFileUpload,
    startConversion,
    downloadConvertedFile,
    resetWorkflow,
  } = useConverter();

  const dropRef = useRef<HTMLDivElement>(null);
  const scanBarRef = useRef<HTMLDivElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);

  // Drag state
  const [dragging, setDragging] = useState(false);
  const [promptIdx, setPromptIdx] = useState(0);
  const [scanTextIdx, setScanTextIdx] = useState(0);

  // Rotate prompts in drop area
  useEffect(() => {
    const t = setInterval(() => setPromptIdx((n) => (n + 1) % DROP_PROMPTS.length), 3200);
    return () => clearInterval(t);
  }, []);

  // Elastic drag animation
  useEffect(() => {
    if (!dropRef.current) return;
    gsap.to(dropRef.current, {
      scale: dragging ? 1.02 : 1,
      duration: 0.4,
      ease: "elastic.out(1, 0.5)",
    });
  }, [dragging]);

  // Handle scan bar animation during analysis
  useEffect(() => {
    if (step === "analyzing") {
      const interval = setInterval(() => {
        setScanTextIdx((prev) => (prev + 1) % SCANNING_MESSAGES.length);
      }, 350);

      if (scanBarRef.current) {
        gsap.fromTo(
          scanBarRef.current,
          { x: "-100%" },
          { x: "100%", duration: 1.1, repeat: -1, ease: "sine.inOut" },
        );
      }

      return () => clearInterval(interval);
    }
  }, [step]);

  // Animate cards on entry
  useEffect(() => {
    if (step === "configured" && cardContainerRef.current) {
      gsap.fromTo(
        cardContainerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
      );
    }
  }, [step]);

  const selectedFormatObj =
    ALL_OUTPUT_FORMATS.find((f) => f.id === selectedFormat) || ALL_OUTPUT_FORMATS[0];

  return (
    <section id="convert" className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 pb-20">
      <div className="rounded-[2.5rem] border border-ink/5 bg-white p-6 sm:p-10 shadow-float dark:bg-surface dark:border-white/10 transition-all">
        {/* ================= STEP 1: UPLOAD AREA ================= */}
        {step === "upload" && (
          <div
            ref={dropRef}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              const f = e.dataTransfer.files?.[0];
              if (f) handleFileUpload(f);
            }}
            className={`relative rounded-[2rem] border-4 border-dashed p-8 sm:p-12 text-center transition-colors ${
              dragging
                ? "border-lime-bright bg-lime/20"
                : "border-ink/15 bg-surface hover:bg-surface-2 dark:border-white/20 dark:bg-surface-2/60 dark:hover:bg-surface-2"
            }`}
          >
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-ink text-lime shadow-float dark:bg-lime dark:text-neutral-950">
              <Upload className="h-8 w-8" />
            </div>
            <p className="mt-5 text-2xl sm:text-3xl font-black text-ink dark:text-white tracking-tight">
              📂 Drop your video here
            </p>
            <p className="mt-2 text-sm font-medium text-ink/60 dark:text-white/70">
              {DROP_PROMPTS[promptIdx]}
            </p>
            <label className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-bold text-white hover:scale-105 transition-transform dark:bg-lime dark:text-neutral-950 dark:hover:bg-lime-bright shadow-md">
              <FileVideo className="h-4 w-4" />
              Or choose video file
              <input
                type="file"
                accept="video/*,image/gif"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleFileUpload(f);
                }}
              />
            </label>
            <div className="mt-4 text-xs font-semibold text-ink/40 dark:text-white/40 flex items-center justify-center gap-1.5">
              <Info className="h-3.5 w-3.5 text-lime" />
              Supports MP4, MOV, MKV, AVI, WEBM, WMV, FLV, MPEG, OGV, TS, 3GP & more. Processed 100%
              on your device.
            </div>
          </div>
        )}

        {/* ================= STEP 2: ANALYZING VIDEO ================= */}
        {step === "analyzing" && (
          <div className="py-12 px-6 text-center rounded-[2rem] bg-surface-2/50 dark:bg-surface-2/30 border border-ink/5 dark:border-white/10">
            <div className="relative mx-auto h-16 w-16 place-items-center flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-lime/30 animate-ping" />
              <div className="h-12 w-12 rounded-full bg-lime grid place-items-center text-neutral-950 shadow-md">
                <Sparkles className="h-6 w-6 animate-spin" />
              </div>
            </div>

            <h3 className="mt-6 text-2xl font-black text-ink dark:text-white">
              {SCANNING_MESSAGES[scanTextIdx]}
            </h3>
            <p className="mt-1 text-sm font-medium text-ink/60 dark:text-white/70">
              Detecting real file container, resolution & stream codecs...
            </p>

            <div className="mt-6 mx-auto max-w-xs h-2 rounded-full bg-ink/10 dark:bg-white/10 overflow-hidden relative">
              <div
                ref={scanBarRef}
                className="absolute inset-0 w-full h-full bg-gradient-lime rounded-full"
              />
            </div>
          </div>
        )}

        {/* ================= STEP 2 & STEP 3: CONFIGURED STATE ================= */}
        {step === "configured" && metadata && (
          <div ref={cardContainerRef} className="space-y-8">
            {/* STEP 2: AUTOMATIC METADATA DISPLAY */}
            <div className="rounded-3xl border border-ink/10 bg-surface/80 p-5 sm:p-6 dark:bg-surface-2/80 dark:border-white/10 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/10 dark:border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-lime text-neutral-950 font-black text-xs">
                    {metadata.format}
                  </div>
                  <div>
                    <h3 className="font-black text-lg text-ink dark:text-white truncate max-w-xs sm:max-w-md">
                      {metadata.filename}
                    </h3>
                    <p className="text-xs text-ink/60 dark:text-white/60 font-medium">
                      ✓ Input format detected automatically
                    </p>
                  </div>
                </div>

                <button
                  onClick={resetWorkflow}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-ink/70 hover:text-ink border border-ink/10 shadow-sm dark:bg-surface dark:text-white/80 dark:border-white/10 dark:hover:text-white cursor-pointer"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  Change File
                </button>
              </div>

              {/* DETECTED METADATA BADGES GRID */}
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
                <MetaBadge label="Format" value={metadata.format} />
                <MetaBadge label="Resolution" value={metadata.resolution} />
                <MetaBadge label="Duration" value={metadata.durationFormatted} />
                <MetaBadge label="Video Codec" value={metadata.videoCodec} />
                <MetaBadge label="Audio Codec" value={metadata.audioCodec} />
                <MetaBadge label="File Size" value={metadata.sizeFormatted} highlight />
              </div>
            </div>

            {/* STEP 3: ASK ONLY ONE QUESTION */}
            <div>
              <div className="text-center sm:text-left mb-5">
                <h3 className="text-2xl sm:text-3xl font-black text-ink dark:text-white tracking-tight">
                  What would you like to convert it into?
                </h3>
                <p className="text-sm font-medium text-ink/60 dark:text-white/70 mt-1">
                  Select your desired target output format below:
                </p>
              </div>

              {/* CLICKABLE CARDS GRID FOR ALL FORMATS */}
              <div className="grid gap-3.5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {ALL_OUTPUT_FORMATS.map((fmt) => {
                  const isSelected = selectedFormat === fmt.id;
                  const Icon = fmt.icon;
                  return (
                    <button
                      key={fmt.id}
                      type="button"
                      onClick={() => setSelectedFormat(fmt.id)}
                      className={`group relative text-left p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                        isSelected
                          ? "border-lime bg-lime/10 dark:bg-lime/20 shadow-lg scale-[1.02]"
                          : "border-ink/10 bg-white hover:border-ink/20 hover:bg-surface/50 dark:bg-surface dark:border-white/10 dark:hover:bg-surface-2"
                      }`}
                    >
                      {fmt.recommended && (
                        <span className="absolute top-3 right-3 rounded-full bg-lime px-2.5 py-0.5 text-[10px] font-black uppercase text-neutral-950 shadow-sm">
                          ⭐ Recommended
                        </span>
                      )}

                      <div className="flex items-center gap-3">
                        <div
                          className={`grid h-11 w-11 place-items-center rounded-xl transition-colors ${
                            isSelected
                              ? "bg-lime text-neutral-950 shadow-md"
                              : "bg-surface-2 text-ink dark:bg-surface-2 dark:text-white"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-xl font-black text-ink dark:text-white">
                            {fmt.title}
                          </div>
                        </div>
                      </div>

                      <p className="mt-2 text-xs text-ink/70 dark:text-white/70 leading-relaxed font-medium">
                        {fmt.desc}
                      </p>

                      <div className="mt-3 flex items-center justify-between pt-2 border-t border-ink/5 dark:border-white/5 text-[11px] font-bold text-ink/50 dark:text-white/50">
                        <span className="truncate max-w-[170px]">{fmt.compatibility}</span>
                        {isSelected && (
                          <span className="flex items-center gap-1 text-neutral-950 dark:text-lime font-black shrink-0">
                            <CheckCircle2 className="h-3.5 w-3.5" /> Selected
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 4: SMART DEFAULTS & COLLAPSIBLE ADVANCED SETTINGS */}
            <div className="border-t border-ink/10 dark:border-white/10 pt-4">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-ink/60 hover:text-ink dark:text-white/60 dark:hover:text-white transition-colors cursor-pointer"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                <span>Advanced Settings</span>
                {showAdvanced ? (
                  <ChevronUp className="h-3.5 w-3.5" />
                ) : (
                  <ChevronDown className="h-3.5 w-3.5" />
                )}
              </button>

              {showAdvanced && (
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5 p-4 rounded-2xl bg-surface/50 dark:bg-surface-2/50 border border-ink/5 dark:border-white/5">
                  <Field label="Resolution">
                    <Select
                      value={advanced.resolution}
                      onValueChange={(val) => setAdvanced({ ...advanced, resolution: val })}
                    >
                      <SelectTrigger className="rounded-xl bg-white border border-ink/10 h-10 font-bold text-xs text-ink dark:text-white dark:bg-surface">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {RESOLUTIONS.map((r) => (
                          <SelectItem key={r} value={r}>
                            {r}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field label="Video Codec">
                    <Select
                      value={advanced.videoCodec}
                      onValueChange={(val) => setAdvanced({ ...advanced, videoCodec: val })}
                    >
                      <SelectTrigger className="rounded-xl bg-white border border-ink/10 h-10 font-bold text-xs text-ink dark:text-white dark:bg-surface">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {CODECS.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field label="Bitrate">
                    <Select
                      value={advanced.bitrate}
                      onValueChange={(val) => setAdvanced({ ...advanced, bitrate: val })}
                    >
                      <SelectTrigger className="rounded-xl bg-white border border-ink/10 h-10 font-bold text-xs text-ink dark:text-white dark:bg-surface">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {BITRATES.map((b) => (
                          <SelectItem key={b} value={b}>
                            {b}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field label="Frame Rate">
                    <Select
                      value={advanced.fps}
                      onValueChange={(val) => setAdvanced({ ...advanced, fps: val })}
                    >
                      <SelectTrigger className="rounded-xl bg-white border border-ink/10 h-10 font-bold text-xs text-ink dark:text-white dark:bg-surface">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {FPS_OPTIONS.map((f) => (
                          <SelectItem key={f} value={f}>
                            {f}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field label="Audio Quality">
                    <Select
                      value={advanced.audioQuality}
                      onValueChange={(val) => setAdvanced({ ...advanced, audioQuality: val })}
                    >
                      <SelectTrigger className="rounded-xl bg-white border border-ink/10 h-10 font-bold text-xs text-ink dark:text-white dark:bg-surface">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {AUDIO_QUALITIES.map((aq) => (
                          <SelectItem key={aq} value={aq}>
                            {aq}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                </div>
              )}
            </div>

            {/* STEP 5: DYNAMIC CONVERT BUTTON */}
            <div>
              <MagneticButton
                onClick={startConversion}
                className="w-full items-center justify-center rounded-full bg-gradient-lime px-8 py-5 text-xl font-black text-neutral-950 shadow-float hover:brightness-105 cursor-pointer"
              >
                <Sparkles className="mr-2 h-6 w-6 text-neutral-950" />
                {selectedFormatObj.buttonLabel}
              </MagneticButton>
            </div>
          </div>
        )}

        {/* ================= STEP 5: REAL FFMPEG CONVERSION PROGRESS ================= */}
        {step === "converting" && (
          <div className="rounded-3xl bg-surface p-8 sm:p-10 dark:bg-surface-2 text-center border border-ink/5 dark:border-white/10 space-y-6">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-lime text-neutral-950 shadow-md">
              <Sparkles className="h-8 w-8 animate-spin" />
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-ink dark:text-white">
                Converting to {selectedFormat}...
              </h3>
              <p className="mt-2 text-sm font-semibold text-lime-bright bg-ink/90 dark:bg-ink px-4 py-1.5 rounded-full inline-block shadow-sm">
                {progress.funnyMessage}
              </p>
            </div>

            {engineLoading && (
              <div className="text-xs font-bold text-ink/70 dark:text-white/70 animate-pulse">
                ⏳ {engineStatus || "Loading FFmpeg WebAssembly engine into browser memory..."}
              </div>
            )}

            <div>
              <div className="flex items-center justify-between text-xs font-black uppercase text-ink/60 dark:text-white/60 mb-2">
                <span>Real Engine Progress</span>
                <span>{progress.percentage}%</span>
              </div>
              <div className="h-5 w-full overflow-hidden rounded-full bg-white dark:bg-surface p-1 shadow-inner border border-ink/10 dark:border-white/10">
                <div
                  className="h-full rounded-full transition-[width] duration-200"
                  style={{ width: `${progress.percentage}%`, background: "var(--gradient-lime)" }}
                />
              </div>
            </div>

            <div className="text-xs font-semibold text-ink/50 dark:text-white/50 flex items-center justify-center gap-1">
              🔒 100% Client-Side. No network uploads. Your video is being processed in your
              browser.
            </div>
          </div>
        )}

        {/* ================= STEP 6: COMPLETION & DIRECT DOWNLOAD ================= */}
        {step === "done" && result && (
          <div className="flex flex-col items-center gap-5 rounded-3xl bg-lime/30 p-8 sm:p-10 text-center dark:bg-lime/20 border border-lime/40 shadow-xl">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-lime text-neutral-950 text-3xl shadow-md">
              🎉
            </div>

            <div>
              <h3 className="text-3xl sm:text-4xl font-black text-ink dark:text-white tracking-tight">
                Conversion Complete!
              </h3>
              <p className="mt-2 text-base font-medium text-ink/70 dark:text-white/80">
                Your video has successfully changed outfits.
              </p>
            </div>

            <div className="w-full max-w-md rounded-2xl bg-white/80 dark:bg-surface/80 p-4 border border-ink/10 dark:border-white/10 text-left text-xs font-semibold text-ink/80 dark:text-white/90 space-y-2">
              <div className="flex justify-between border-b border-ink/5 dark:border-white/5 pb-2">
                <span className="text-ink/50 dark:text-white/50">Output File:</span>
                <span className="font-bold text-ink dark:text-white">{result.filename}</span>
              </div>
              <div className="flex justify-between border-b border-ink/5 dark:border-white/5 pb-2">
                <span className="text-ink/50 dark:text-white/50">Original → Output:</span>
                <span className="font-bold text-lime-bright bg-neutral-950 px-2 py-0.5 rounded">
                  {result.originalSizeFormatted} → {result.outputSizeFormatted}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink/50 dark:text-white/50">Location:</span>
                <span className="text-ink dark:text-white">Generated in Browser Memory</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <MagneticButton
                onClick={() => {
                  downloadConvertedFile();
                  toast.success("Download started! 🎉", {
                    description: `Direct browser download for ${result.filename}.`,
                  });
                }}
                className="items-center gap-2 rounded-full bg-ink px-8 py-4 text-base font-black text-white dark:bg-lime dark:text-neutral-950 dark:hover:bg-lime-bright shadow-lg cursor-pointer"
              >
                <Download className="h-5 w-5" />
                Download Converted Video
              </MagneticButton>

              <button
                type="button"
                onClick={resetWorkflow}
                className="rounded-full bg-white px-7 py-4 text-base font-bold text-ink border border-ink/15 hover:bg-surface transition-colors dark:bg-surface dark:text-white dark:border-white/20 dark:hover:bg-surface-2 shadow-sm cursor-pointer"
              >
                Convert Another Video
              </button>
            </div>
          </div>
        )}

        {/* ================= ERROR STATE ================= */}
        {step === "error" && error && (
          <div className="flex flex-col items-center gap-4 rounded-3xl bg-red-500/10 p-8 text-center border border-red-500/30">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-red-500 text-white font-black text-xl shadow-md">
              <AlertCircle className="h-6 w-6" />
            </div>

            <div>
              <h3 className="text-2xl font-black text-ink dark:text-white">{error.title}</h3>
              <p className="mt-1 text-sm font-medium text-ink/70 dark:text-white/70 max-w-md">
                {error.message}
              </p>
            </div>

            <button
              type="button"
              onClick={resetWorkflow}
              className="mt-2 rounded-full bg-ink px-6 py-2.5 text-xs font-bold text-white dark:bg-lime dark:text-neutral-950 hover:opacity-90 cursor-pointer"
            >
              Try Another File
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function MetaBadge({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl p-2.5 text-center border transition-colors ${
        highlight
          ? "bg-lime/20 border-lime/40 dark:bg-lime/20 dark:border-lime/30"
          : "bg-white/80 border-ink/5 dark:bg-surface/60 dark:border-white/5"
      }`}
    >
      <div className="text-[10px] font-bold uppercase tracking-wider text-ink/50 dark:text-white/50 truncate">
        ✓ {label}
      </div>
      <div
        className={`mt-0.5 text-xs font-black truncate ${
          highlight ? "text-neutral-950 dark:text-lime" : "text-ink dark:text-white"
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-ink/50 dark:text-white/50">
        {label}
      </label>
      {children}
    </div>
  );
}
