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
  Trash2,
  Plus,
  Archive,
  Square,
  Clock,
  Check,
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
import { SupportedOutputFormat, BatchItem, QualityPreset } from "@/types/converter";
import { ConversionService } from "@/services/conversionService";
import { getItemInputFormat } from "@/services/metadataService";
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
    buttonLabel: "✨ Convert All to MP4",
    defaultCodec: "H.264 / AAC",
  },
  {
    id: "WEBM",
    title: "WEBM",
    desc: "Smaller files, perfect for websites and modern browsers.",
    compatibility: "Optimized for Chrome, Firefox, Edge, HTML5 video",
    icon: Globe,
    buttonLabel: "🚀 Convert All to WEBM",
    defaultCodec: "VP8 / Vorbis",
  },
  {
    id: "MKV",
    title: "MKV",
    desc: "Keeps high quality, multiple tracks & subtitles.",
    compatibility: "Great for VLC, desktop media centers & archival",
    icon: Clapperboard,
    buttonLabel: "🎥 Convert All to MKV",
    defaultCodec: "H.264 / AAC",
  },
  {
    id: "MOV",
    title: "MOV",
    desc: "Native format for Apple ecosystem & QuickTime.",
    compatibility: "Ideal for Final Cut Pro, iMovie, Mac & iPhone",
    icon: Tv,
    buttonLabel: "🍎 Convert All to MOV",
    defaultCodec: "H.264 / AAC",
  },
  {
    id: "AVI",
    title: "AVI",
    desc: "Legacy format for older video players and TVs.",
    compatibility: "Compatible with older media players and Windows",
    icon: Disc,
    buttonLabel: "📼 Convert All to AVI",
    defaultCodec: "MPEG-4 / MP3",
  },
  {
    id: "WMV",
    title: "WMV",
    desc: "Windows Media Video for legacy Windows software.",
    compatibility: "Native for Windows Media Player & Office tools",
    icon: Disc,
    buttonLabel: "🪟 Convert All to WMV",
    defaultCodec: "WMV2 / WMA",
  },
  {
    id: "FLV",
    title: "FLV",
    desc: "Flash Video container for retro video playback.",
    compatibility: "Legacy flash video streams",
    icon: FileVideo,
    buttonLabel: "⚡ Convert All to FLV",
    defaultCodec: "FLV1 / MP3",
  },
  {
    id: "MPEG",
    title: "MPEG",
    desc: "Standard MPEG video format for DVDs and TV broadcast.",
    compatibility: "Wide DVD player & hardware support",
    icon: Tv,
    buttonLabel: "📺 Convert All to MPEG",
    defaultCodec: "MPEG-2 / MP2",
  },
  {
    id: "M4V",
    title: "M4V",
    desc: "iTunes & Apple ecosystem video format.",
    compatibility: "Optimized for Apple TV, iTunes, iPhone",
    icon: Film,
    buttonLabel: "📱 Convert All to M4V",
    defaultCodec: "H.264 / AAC",
  },
  {
    id: "OGV",
    title: "OGV",
    desc: "Open-source Ogg video container.",
    compatibility: "Patent-free open format for HTML5",
    icon: Globe,
    buttonLabel: "🌐 Convert All to OGV",
    defaultCodec: "Theora / Vorbis",
  },
  {
    id: "TS",
    title: "TS",
    desc: "MPEG Transport Stream for video streaming.",
    compatibility: "Used in broadcast TV & HLS streaming",
    icon: Disc,
    buttonLabel: "📡 Convert All to TS",
    defaultCodec: "H.264 / MPEGTS",
  },
  {
    id: "3GP",
    title: "3GP",
    desc: "Ultra-compact video format for older mobile phones.",
    compatibility: "Legacy mobile devices & feature phones",
    icon: Smartphone,
    buttonLabel: "📱 Convert All to 3GP",
    defaultCodec: "H.263 / AMR",
  },
  {
    id: "GIF",
    title: "GIF",
    desc: "Animated looping image with no audio track.",
    icon: Image,
    compatibility: "Shareable anywhere as an image badge",
    buttonLabel: "🎬 Convert All to GIF",
    defaultCodec: "Animated GIF",
  },
  {
    id: "MP3",
    title: "MP3",
    desc: "Extract high quality audio track only.",
    compatibility: "Plays on 100% of audio devices & players",
    icon: Music,
    buttonLabel: "🎵 Extract All to MP3",
    defaultCodec: "320 kbps MP3",
  },
];

const DROP_PROMPTS = [
  "Drag your video files here (multiple supported).",
  "Throw them gently into the queue.",
  "100% Client-Side. Files never leave your browser.",
  "Drop your video files for batch processing.",
];

const SCANNING_MESSAGES = [
  "Scanning video files...",
  "Reading container metadata...",
  "Detecting resolutions & frame rates...",
  "Building conversion queue...",
];

const RESOLUTIONS = ["Same as Original", "4K (2160p)", "1080p", "720p", "480p", "360p"];
const CODECS = ["Auto (Recommended)", "H.264", "H.265 / HEVC", "VP9", "AV1", "ProRes"];
const BITRATES = ["Auto", "16 Mbps", "12 Mbps", "8 Mbps", "4 Mbps", "2 Mbps"];
const FPS_OPTIONS = ["Same as Original", "60 FPS", "30 FPS", "24 FPS"];
const AUDIO_QUALITIES = ["Original", "320 kbps", "256 kbps", "192 kbps", "128 kbps", "Mute Audio"];

export function ConverterPanel() {
  const {
    step,
    queue,
    selectedFormat,
    setSelectedFormat,
    updateItemFormat,
    advanced,
    setAdvanced,
    showAdvanced,
    setShowAdvanced,
    engineLoading,
    engineStatus,
    progress,
    error,
    handleMultipleFileUpload,
    removeItem,
    clearQueue,
    startConversion,
    cancelConversion,
    downloadItem,
    downloadAllAsZip,
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
    if ((step === "configured" || step === "done") && cardContainerRef.current) {
      gsap.fromTo(
        cardContainerRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
      );
    }
  }, [step]);

  const selectedFormatObj =
    ALL_OUTPUT_FORMATS.find((f) => f.id === selectedFormat) || ALL_OUTPUT_FORMATS[0];

  const completedCount = queue.filter((i) => i.status === "completed").length;
  const failedCount = queue.filter((i) => i.status === "failed").length;
  const inProgressCount = queue.filter((i) => i.status === "converting").length;
  const isAllFinished =
    queue.length > 0 && queue.every((i) => i.status === "completed" || i.status === "failed");

  const queueInputFormats = queue.map(getItemInputFormat);
  const firstInputFormat = queueInputFormats[0];
  const allItemsShareFormat =
    queueInputFormats.length > 0 && queueInputFormats.every((fmt) => fmt === firstInputFormat);

  return (
    <section id="convert" className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 pb-20">
      <div className="rounded-[2.5rem] border border-ink/5 bg-white p-6 sm:p-10 shadow-float dark:bg-surface dark:border-white/10 transition-all">
        {/* ================= STEP 1: UPLOAD AREA ================= */}
        {step === "upload" && queue.length === 0 && (
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
              const files = e.dataTransfer.files;
              if (files && files.length > 0) handleMultipleFileUpload(files);
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
              📂 Drop video files here
            </p>
            <p className="mt-2 text-sm font-medium text-ink/60 dark:text-white/70">
              {DROP_PROMPTS[promptIdx]}
            </p>
            <label className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-bold text-white hover:scale-105 transition-transform dark:bg-lime dark:text-neutral-950 dark:hover:bg-lime-bright shadow-md">
              <FileVideo className="h-4 w-4" />
              Select Video Files (Batch Supported)
              <input
                type="file"
                accept="video/*,image/gif"
                multiple
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    handleMultipleFileUpload(e.target.files);
                  }
                }}
              />
            </label>
            <div className="mt-4 text-xs font-semibold text-ink/40 dark:text-white/40 flex items-center justify-center gap-1.5">
              <Info className="h-3.5 w-3.5 text-lime" />
              Batch conversion ready. MP4, MOV, MKV, AVI, WEBM, WMV, GIF, MP3 & more. Processed 100%
              client-side.
            </div>
          </div>
        )}

        {/* ================= STEP 2: ANALYZING VIDEOS ================= */}
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
              Reading video properties and setting up batch queue...
            </p>

            <div className="mt-6 mx-auto max-w-xs h-2 rounded-full bg-ink/10 dark:bg-white/10 overflow-hidden relative">
              <div
                ref={scanBarRef}
                className="absolute inset-0 w-full h-full bg-gradient-lime rounded-full"
              />
            </div>
          </div>
        )}

        {/* ================= BATCH QUEUE & CONFIGURED STATE ================= */}
        {(step === "configured" || step === "converting" || step === "done") &&
          queue.length > 0 && (
            <div ref={cardContainerRef} className="space-y-8">
              {/* TOP BAR: QUEUE SUMMARY & BATCH ACTIONS */}
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-ink/10 bg-surface/80 p-5 sm:p-6 dark:bg-surface-2/80 dark:border-white/10 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-lime text-neutral-950 font-black text-sm shadow-md">
                    {queue.length}
                  </div>
                  <div>
                    <h3 className="font-black text-xl text-ink dark:text-white flex items-center gap-2">
                      Conversion Queue
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-lime/20 text-neutral-950 dark:text-lime">
                        {completedCount}/{queue.length} Ready
                      </span>
                      {allItemsShareFormat ? (
                        <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-ink/5 text-ink dark:bg-white/10 dark:text-white border border-ink/10 dark:border-white/10">
                          Input Format: {firstInputFormat}
                        </span>
                      ) : queueInputFormats.length > 0 ? (
                        <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-ink/5 text-ink dark:bg-white/10 dark:text-white border border-ink/10 dark:border-white/10">
                          Detected: {Array.from(new Set(queueInputFormats)).join(", ")}
                        </span>
                      ) : null}
                    </h3>
                    <p className="text-xs text-ink/60 dark:text-white/60 font-medium">
                      {step === "converting"
                        ? `Converting item ${inProgressCount > 0 ? "in progress" : "sequentially"}...`
                        : isAllFinished
                          ? "All files processed in queue!"
                          : "Configure output format for each item or convert all at once."}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-xs font-bold text-ink border border-ink/10 shadow-sm hover:bg-surface dark:bg-surface dark:text-white dark:border-white/10 dark:hover:bg-surface-2">
                    <Plus className="h-3.5 w-3.5 text-lime" />
                    Add Files
                    <input
                      type="file"
                      accept="video/*,image/gif"
                      multiple
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          handleMultipleFileUpload(e.target.files);
                        }
                      }}
                    />
                  </label>

                  {completedCount > 0 && (
                    <button
                      type="button"
                      onClick={downloadAllAsZip}
                      className="inline-flex items-center gap-1.5 rounded-full bg-lime px-4 py-2 text-xs font-black text-neutral-950 hover:bg-lime-bright shadow-md cursor-pointer"
                    >
                      <Archive className="h-3.5 w-3.5" />
                      Download All (ZIP)
                    </button>
                  )}

                  {step === "converting" ? (
                    <button
                      type="button"
                      onClick={cancelConversion}
                      className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-3.5 py-2 text-xs font-bold text-red-600 dark:text-red-400 border border-red-500/20 hover:bg-red-500/20 cursor-pointer"
                    >
                      <Square className="h-3.5 w-3.5" />
                      Cancel
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={clearQueue}
                      className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-xs font-bold text-ink/70 hover:text-ink border border-ink/10 shadow-sm dark:bg-surface dark:text-white/80 dark:border-white/10 dark:hover:text-white cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5 text-red-500" />
                      Clear Queue
                    </button>
                  )}
                </div>
              </div>

              {/* QUEUE ITEM LIST */}
              <div className="space-y-3">
                <div className="text-xs font-black uppercase tracking-wider text-ink/50 dark:text-white/50 px-1 flex justify-between items-center">
                  <span>Selected Files ({queue.length})</span>
                  <span>Sequential Browser Processing</span>
                </div>

                <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1 scrollbar-thin">
                  {queue.map((item, idx) => (
                    <QueueItemRow
                      key={item.id}
                      item={item}
                      index={idx + 1}
                      isConvertingBatch={step === "converting"}
                      onFormatChange={(fmt) => updateItemFormat(item.id, fmt)}
                      onRemove={() => removeItem(item.id)}
                      onDownload={() => {
                        downloadItem(item.id);
                        toast.success(`Downloading ${item.result?.filename || item.file.name}`);
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* FORMAT SELECTION GRID (Apply format to waiting items) */}
              {step !== "converting" && (
                <div>
                  <div className="text-center sm:text-left mb-4">
                    <h3 className="text-xl sm:text-2xl font-black text-ink dark:text-white tracking-tight">
                      Select Target Output Format for All
                    </h3>
                    <p className="text-xs font-medium text-ink/60 dark:text-white/70 mt-0.5">
                      Clicking a format updates the target extension for waiting items in queue:
                    </p>
                  </div>

                  <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
                    {ALL_OUTPUT_FORMATS.filter((fmt) => {
                      if (
                        allItemsShareFormat &&
                        fmt.id.toUpperCase() === firstInputFormat.toUpperCase()
                      ) {
                        return false;
                      }
                      return true;
                    }).map((fmt) => {
                      const isSelected = selectedFormat === fmt.id;
                      const Icon = fmt.icon;
                      return (
                        <button
                          key={fmt.id}
                          type="button"
                          onClick={() => setSelectedFormat(fmt.id)}
                          className={`group relative text-center p-3 rounded-2xl border-2 transition-all cursor-pointer ${
                            isSelected
                              ? "border-lime bg-lime/10 dark:bg-lime/20 shadow-md scale-105"
                              : "border-ink/10 bg-white hover:border-ink/20 dark:bg-surface dark:border-white/10 dark:hover:bg-surface-2"
                          }`}
                        >
                          <div
                            className={`mx-auto grid h-8 w-8 place-items-center rounded-lg transition-colors ${
                              isSelected
                                ? "bg-lime text-neutral-950 shadow-sm"
                                : "bg-surface-2 text-ink dark:bg-surface-2 dark:text-white"
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="mt-1.5 text-xs font-black text-ink dark:text-white">
                            {fmt.title}
                          </div>
                          {fmt.recommended && (
                            <div className="text-[9px] font-bold text-lime-bright dark:text-lime truncate">
                              ⭐ Top choice
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* QUALITY PRESET SELECTOR BAR */}
              {step !== "converting" && (
                <div className="rounded-2xl bg-surface/40 dark:bg-surface-2/40 border border-ink/10 dark:border-white/10 p-4 space-y-2.5">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <div className="text-xs font-black uppercase tracking-wider text-ink dark:text-white flex items-center gap-1.5">
                      <SlidersHorizontal className="h-3.5 w-3.5 text-lime" />
                      Quality & Compression Mode
                    </div>
                    <span className="text-[11px] font-semibold text-ink/60 dark:text-white/60">
                      Optimizes encoding preset & target file size
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {(["Balanced", "High Quality", "Small Size"] as const).map((preset) => {
                      const isSelected = (advanced.qualityPreset || "Balanced") === preset;
                      return (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setAdvanced({ ...advanced, qualityPreset: preset })}
                          className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer ${
                            isSelected
                              ? "border-lime bg-lime/10 dark:bg-lime/20 text-ink dark:text-white font-extrabold shadow-sm scale-[1.02]"
                              : "border-ink/10 dark:border-white/10 bg-white dark:bg-surface text-ink/70 dark:text-white/70 hover:border-ink/20 font-bold"
                          }`}
                        >
                          <span className="text-xs font-black flex items-center gap-1">
                            {preset === "Balanced"
                              ? "⚖️ Balanced (Default)"
                              : preset === "High Quality"
                                ? "✨ High Quality"
                                : "📦 Small Size"}
                          </span>
                          <span className="text-[10px] font-semibold text-ink/50 dark:text-white/50 mt-0.5">
                            {preset === "Balanced"
                              ? "Optimal size & quality trade-off"
                              : preset === "High Quality"
                                ? "Preserves maximum visual detail"
                                : "Prioritizes minimal file size"}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ADVANCED SETTINGS TOGGLE */}
              {step !== "converting" && (
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
                    <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-6 p-4 rounded-2xl bg-surface/50 dark:bg-surface-2/50 border border-ink/5 dark:border-white/5">
                      <Field label="Quality Preset">
                        <Select
                          value={advanced.qualityPreset || "Balanced"}
                          onValueChange={(val) =>
                            setAdvanced({ ...advanced, qualityPreset: val as QualityPreset })
                          }
                        >
                          <SelectTrigger className="rounded-xl bg-white border border-ink/10 h-10 font-bold text-xs text-ink dark:text-white dark:bg-surface">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Balanced">⚖️ Balanced</SelectItem>
                            <SelectItem value="High Quality">✨ High Quality</SelectItem>
                            <SelectItem value="Small Size">📦 Small Size</SelectItem>
                          </SelectContent>
                        </Select>
                      </Field>

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
              )}

              {/* CONVERT ACTION BUTTON */}
              {step !== "converting" && !isAllFinished && (
                <div>
                  <MagneticButton
                    onClick={startConversion}
                    className="w-full items-center justify-center rounded-full bg-gradient-lime px-8 py-5 text-xl font-black text-neutral-950 shadow-float hover:brightness-105 cursor-pointer"
                  >
                    <Sparkles className="mr-2 h-6 w-6 text-neutral-950" />
                    {queue.length > 1
                      ? `⚡ Convert ${queue.length} Files to ${selectedFormat}`
                      : selectedFormatObj.buttonLabel}
                  </MagneticButton>
                </div>
              )}

              {/* CONVERTING STATE STATUS BAR */}
              {step === "converting" && (
                <div className="rounded-3xl bg-surface p-6 sm:p-8 dark:bg-surface-2 text-center border border-ink/5 dark:border-white/10 space-y-4">
                  <div className="flex items-center justify-center gap-3">
                    <Sparkles className="h-6 w-6 animate-spin text-lime" />
                    <h3 className="text-xl font-black text-ink dark:text-white">
                      {progress.statusText || "Processing queue..."}
                    </h3>
                  </div>

                  {engineLoading && (
                    <p className="text-xs font-bold text-lime-bright animate-pulse">
                      ⏳ {engineStatus || "Loading FFmpeg WebAssembly engine..."}
                    </p>
                  )}

                  <div className="text-xs font-semibold text-ink/50 dark:text-white/50 flex items-center justify-center gap-1">
                    🔒 100% Client-Side. Converting files sequentially in browser memory to save
                    RAM.
                  </div>
                </div>
              )}

              {/* ALL DONE BANNER & DOWNLOAD ALL */}
              {isAllFinished && (
                <div className="flex flex-col items-center gap-4 rounded-3xl bg-lime/30 p-8 text-center dark:bg-lime/20 border border-lime/40 shadow-xl">
                  <div className="grid h-14 w-14 place-items-center rounded-full bg-lime text-neutral-950 text-2xl shadow-md">
                    🎉
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black text-ink dark:text-white tracking-tight">
                      Batch Conversion Completed!
                    </h3>
                    <p className="mt-1 text-sm font-medium text-ink/70 dark:text-white/80">
                      Successfully processed {completedCount} out of {queue.length} video files.
                    </p>
                  </div>

                  <div className="flex flex-wrap justify-center gap-3 pt-2">
                    <MagneticButton
                      onClick={downloadAllAsZip}
                      className="items-center gap-2 rounded-full bg-ink px-8 py-4 text-base font-black text-white dark:bg-lime dark:text-neutral-950 dark:hover:bg-lime-bright shadow-lg cursor-pointer"
                    >
                      <Archive className="h-5 w-5" />
                      Download All as ZIP
                    </MagneticButton>

                    <button
                      type="button"
                      onClick={resetWorkflow}
                      className="rounded-full bg-white px-6 py-4 text-sm font-bold text-ink border border-ink/15 hover:bg-surface transition-colors dark:bg-surface dark:text-white dark:border-white/20 dark:hover:bg-surface-2 shadow-sm cursor-pointer"
                    >
                      Convert More Files
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

        {/* ================= GLOBAL ERROR STATE ================= */}
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
              Try Again
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * INDIVIDUAL QUEUE ROW COMPONENT
 */
function QueueItemRow({
  item,
  index,
  isConvertingBatch,
  onFormatChange,
  onRemove,
  onDownload,
}: {
  item: BatchItem;
  index: number;
  isConvertingBatch: boolean;
  onFormatChange: (fmt: SupportedOutputFormat) => void;
  onRemove: () => void;
  onDownload: () => void;
}) {
  const isWaiting = item.status === "waiting";
  const isConverting = item.status === "converting";
  const isCompleted = item.status === "completed";
  const isFailed = item.status === "failed";

  const itemInputFormat = getItemInputFormat(item);

  return (
    <div
      className={`relative rounded-2xl border p-4 transition-all ${
        isConverting
          ? "border-lime bg-lime/10 dark:bg-lime/15 shadow-md"
          : isCompleted
            ? "border-lime/30 bg-surface/90 dark:bg-surface-2/90"
            : isFailed
              ? "border-red-500/30 bg-red-500/5 dark:bg-red-500/10"
              : "border-ink/10 bg-white dark:bg-surface dark:border-white/10"
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* FILE INFO */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div
            className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl font-extrabold text-xs ${
              isCompleted
                ? "bg-lime text-neutral-950"
                : isConverting
                  ? "bg-lime text-neutral-950 animate-pulse"
                  : isFailed
                    ? "bg-red-500 text-white"
                    : "bg-surface-2 text-ink dark:text-white"
            }`}
          >
            {isCompleted ? (
              <Check className="h-4 w-4" />
            ) : isConverting ? (
              <Sparkles className="h-4 w-4 animate-spin" />
            ) : isFailed ? (
              <AlertCircle className="h-4 w-4" />
            ) : (
              `#${index}`
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h4 className="font-bold text-sm text-ink dark:text-white truncate">
              {item.file.name}
            </h4>
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold text-ink/60 dark:text-white/60 mt-0.5">
              <span className="font-extrabold text-ink dark:text-white bg-ink/5 dark:bg-white/10 px-1.5 py-0.5 rounded-md">
                Input Format: {itemInputFormat}
              </span>
              <span>•</span>
              <span>
                {item.metadata?.sizeFormatted || `${(item.file.size / 1024 / 1024).toFixed(1)} MB`}
              </span>
              {item.metadata?.resolution && (
                <>
                  <span>•</span>
                  <span>{item.metadata.resolution}</span>
                </>
              )}
              {isWaiting && (
                <>
                  <span>•</span>
                  <span className="font-bold text-lime-bright dark:text-lime">
                    Est. ~
                    {
                      ConversionService.estimateOutputSize(
                        item.file.size,
                        item.metadata?.duration || 0,
                        item.outputFormat,
                        item.advancedSettings,
                      ).formatted
                    }
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* OUTPUT FORMAT SELECTOR & STATUS BADGE */}
        <div className="flex items-center gap-2 shrink-0">
          {isWaiting && !isConvertingBatch ? (
            <Select
              value={item.outputFormat}
              onValueChange={(val) => onFormatChange(val as SupportedOutputFormat)}
            >
              <SelectTrigger className="h-8 w-28 rounded-xl bg-surface-2 border-ink/10 text-xs font-black text-ink dark:text-white dark:border-white/10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ALL_OUTPUT_FORMATS.filter(
                  (fmt) => fmt.id.toUpperCase() !== itemInputFormat.toUpperCase(),
                ).map((fmt) => (
                  <SelectItem key={fmt.id} value={fmt.id} className="text-xs font-bold">
                    ➜ {fmt.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <div className="text-xs font-black px-2.5 py-1 rounded-xl bg-ink/5 dark:bg-white/10 text-ink dark:text-white">
              ➜ {item.outputFormat}
            </div>
          )}

          {/* STATUS BADGE */}
          <StatusTag status={item.status} />

          {/* DOWNLOAD BUTTON FOR COMPLETED ITEM */}
          {isCompleted && (
            <button
              type="button"
              onClick={onDownload}
              className="inline-flex items-center gap-1 rounded-xl bg-lime px-3 py-1.5 text-xs font-black text-neutral-950 hover:bg-lime-bright shadow-sm cursor-pointer transition-transform hover:scale-105"
            >
              <Download className="h-3.5 w-3.5" />
              Download
            </button>
          )}

          {/* REMOVE BUTTON WHEN WAITING */}
          {isWaiting && !isConvertingBatch && (
            <button
              type="button"
              onClick={onRemove}
              className="p-1.5 rounded-lg text-ink/40 hover:text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
              title="Remove file"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* INDIVIDUAL PROGRESS BAR */}
      {isConverting && (
        <div className="mt-3">
          <div className="flex justify-between text-[11px] font-bold text-ink/70 dark:text-white/70 mb-1">
            <span className="flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-lime animate-spin" /> Converting frame streams...
            </span>
            <span>{item.progress}%</span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-ink/10 dark:bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-150 bg-gradient-lime"
              style={{ width: `${item.progress}%` }}
            />
          </div>
        </div>
      )}

      {/* COMPLETED RESULT STATS */}
      {isCompleted && item.result && (
        <div className="mt-2 pt-2 border-t border-ink/5 dark:border-white/5 flex items-center justify-between text-[11px] text-ink/60 dark:text-white/60 font-semibold">
          <span>
            Output name:{" "}
            <strong className="text-ink dark:text-white">{item.result.filename}</strong>
          </span>
          <span className="text-lime-bright font-bold">
            Size: {item.result.outputSizeFormatted}
          </span>
        </div>
      )}

      {/* FAILED ERROR DETAIL */}
      {isFailed && item.error && (
        <p className="mt-1.5 text-xs font-bold text-red-500 flex items-center gap-1">
          <AlertCircle className="h-3.5 w-3.5" /> {item.error}
        </p>
      )}
    </div>
  );
}

function StatusTag({ status }: { status: BatchItem["status"] }) {
  switch (status) {
    case "waiting":
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-surface-2 text-ink/60 dark:text-white/60 border border-ink/5 dark:border-white/5">
          <Clock className="h-3 w-3" /> Waiting
        </span>
      );
    case "converting":
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-lime/30 text-neutral-950 dark:text-lime border border-lime/40 animate-pulse">
          Converting
        </span>
      );
    case "completed":
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-lime/20 text-neutral-950 dark:text-lime border border-lime/30">
          <CheckCircle2 className="h-3 w-3 text-lime" /> Completed
        </span>
      );
    case "failed":
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/30">
          Failed
        </span>
      );
  }
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
