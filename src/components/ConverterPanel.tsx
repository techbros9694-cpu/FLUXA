import { useState, useEffect, useRef, memo, useCallback } from "react";
import gsap from "gsap";
import {
  Upload,
  Sparkles,
  Download,
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
  CheckCircle2,
  Zap,
  Cpu,
  Layers,
  Gauge,
  RotateCcw,
  Activity,
  ArrowRight,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MagneticButton } from "./MagneticButton";
import { useConverter, formatDuration, formatTimeClock } from "@/hooks/useConverter";
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

const NOOP_FORMAT_CHANGE = () => {};
const NOOP_REMOVE = () => {};
const NOOP_DOWNLOAD = () => {};

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
    batchElapsedTime,
    overallProgress,
    batchSummaryStats,
    progress,
    error,
    handleMultipleFileUpload,
    removeItem,
    clearQueue,
    startConversion,
    retryFailedItems,
    retryItem,
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
    if (
      (step === "configured" || step === "converting" || step === "done") &&
      cardContainerRef.current
    ) {
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

  const currentConvertingItem = queue.find((i) => i.status === "converting") || queue[0];

  const queueInputFormats = queue.map(getItemInputFormat);
  const firstInputFormat = queueInputFormats[0];
  const allItemsShareFormat =
    queueInputFormats.length > 0 && queueInputFormats.every((fmt) => fmt === firstInputFormat);

  return (
    <section id="convert" className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 pb-20">
      <div className="rounded-[2rem] sm:rounded-[2.5rem] border border-ink/5 bg-white p-4 sm:p-8 md:p-10 shadow-float dark:bg-surface dark:border-white/10 transition-all">
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
            className={`relative rounded-[1.75rem] sm:rounded-[2rem] border-3 sm:border-4 border-dashed p-6 sm:p-10 md:p-12 text-center transition-colors ${
              dragging
                ? "border-lime-bright bg-lime/20"
                : "border-ink/15 bg-surface hover:bg-surface-2 dark:border-white/20 dark:bg-surface-2/60 dark:hover:bg-surface-2"
            }`}
          >
            <div className="mx-auto grid h-16 w-16 sm:h-20 sm:w-20 place-items-center rounded-2xl sm:rounded-3xl bg-ink text-lime shadow-float dark:bg-lime dark:text-neutral-950">
              <Upload className="h-7 w-7 sm:h-8 sm:w-8" />
            </div>
            <p className="mt-4 sm:mt-5 text-xl sm:text-3xl font-black text-ink dark:text-white tracking-tight">
              📂 Drop video files here
            </p>
            <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm font-medium text-ink/60 dark:text-white/70">
              {DROP_PROMPTS[promptIdx]}
            </p>
            <label className="mt-5 sm:mt-6 inline-flex min-h-[48px] cursor-pointer items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-xs sm:text-sm font-bold text-white hover:scale-105 active:scale-95 transition-transform dark:bg-lime dark:text-neutral-950 dark:hover:bg-lime-bright shadow-md w-full sm:w-auto">
              <FileVideo className="h-4 w-4 shrink-0" />
              <span>Select Video Files (Batch Supported)</span>
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
            <div className="mt-4 text-[11px] sm:text-xs font-semibold text-ink/40 dark:text-white/40 flex items-center justify-center gap-1.5 px-2">
              <Info className="h-3.5 w-3.5 text-lime shrink-0" />
              <span>
                Batch conversion ready. MP4, MOV, MKV, AVI, WEBM, WMV, GIF, MP3 & more. Processed
                100% client-side.
              </span>
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

        {/* ================= STEP 3: CONVERTING DASHBOARD ================= */}
        {step === "converting" && (
          <div ref={cardContainerRef} className="space-y-6">
            <ConversionDashboardView
              currentFile={currentConvertingItem}
              overallProgress={overallProgress}
              batchElapsedTime={batchElapsedTime}
              progress={progress}
              queue={queue}
              onCancel={cancelConversion}
            />
          </div>
        )}

        {/* ================= STEP 4: COMPLETION SCREEN ================= */}
        {step === "done" && (
          <div ref={cardContainerRef} className="space-y-6">
            <CompletionSummaryScreen
              queue={queue}
              stats={batchSummaryStats}
              onDownloadAll={downloadAllAsZip}
              onDownloadItem={downloadItem}
              onRetryFailed={retryFailedItems}
              onRetrySingle={retryItem}
              onReset={resetWorkflow}
            />
          </div>
        )}

        {/* ================= BATCH QUEUE & CONFIGURED STATE ================= */}
        {step === "configured" && queue.length > 0 && (
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
                    Configure output format for each item or convert all at once.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <label className="inline-flex min-h-[44px] cursor-pointer items-center justify-center gap-1.5 rounded-full bg-white px-4 py-2.5 text-xs font-bold text-ink border border-ink/10 shadow-sm hover:bg-surface active:scale-95 transition-transform dark:bg-surface dark:text-white dark:border-white/10 dark:hover:bg-surface-2 flex-1 sm:flex-initial">
                  <Plus className="h-4 w-4 text-lime shrink-0" />
                  <span>Add Files</span>
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
                    className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-full bg-lime px-4 py-2.5 text-xs font-black text-neutral-950 hover:bg-lime-bright active:scale-95 transition-transform shadow-md cursor-pointer flex-1 sm:flex-initial"
                  >
                    <Archive className="h-4 w-4 shrink-0" />
                    <span>Download All (ZIP)</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={clearQueue}
                  className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-full bg-white px-4 py-2.5 text-xs font-bold text-ink/70 hover:text-ink border border-ink/10 shadow-sm active:scale-95 transition-transform dark:bg-surface dark:text-white/80 dark:border-white/10 dark:hover:text-white cursor-pointer flex-1 sm:flex-initial"
                >
                  <Trash2 className="h-4 w-4 text-red-500 shrink-0" />
                  <span>Clear Queue</span>
                </button>
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
                    isConvertingBatch={false}
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

            {/* FORMAT SELECTION GRID */}
            <div>
              <div className="text-center sm:text-left mb-4">
                <h3 className="text-xl sm:text-2xl font-black text-ink dark:text-white tracking-tight">
                  Select Target Output Format for All
                </h3>
                <p className="text-xs font-medium text-ink/60 dark:text-white/70 mt-0.5">
                  Clicking a format updates the target extension for waiting items in queue:
                </p>
              </div>

              <div className="grid gap-2.5 sm:gap-3 grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7">
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
                      className={`group relative text-center p-2.5 sm:p-3 rounded-2xl border-2 transition-all cursor-pointer min-h-[56px] flex flex-col items-center justify-center ${
                        isSelected
                          ? "border-lime bg-lime/10 dark:bg-lime/20 shadow-md scale-105"
                          : "border-ink/10 bg-white hover:border-ink/20 dark:bg-surface dark:border-white/10 dark:hover:bg-surface-2"
                      }`}
                    >
                      <div
                        className={`mx-auto grid h-7 w-7 sm:h-8 sm:w-8 place-items-center rounded-lg transition-colors ${
                          isSelected
                            ? "bg-lime text-neutral-950 shadow-sm"
                            : "bg-surface-2 text-ink dark:bg-surface-2 dark:text-white"
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </div>
                      <div className="mt-1 text-xs font-black text-ink dark:text-white">
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

            {/* QUALITY PRESET SELECTOR BAR */}
            <div className="rounded-2xl bg-surface/40 dark:bg-surface-2/40 border border-ink/10 dark:border-white/10 p-3.5 sm:p-4 space-y-2.5">
              <div className="flex flex-wrap items-center justify-between gap-1">
                <div className="text-xs font-black uppercase tracking-wider text-ink dark:text-white flex items-center gap-1.5">
                  <SlidersHorizontal className="h-3.5 w-3.5 text-lime" />
                  Quality & Compression Mode
                </div>
                <span className="text-[11px] font-semibold text-ink/60 dark:text-white/60">
                  Optimizes encoding preset & target file size
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5">
                {(["Balanced", "High Quality", "Small Size"] as const).map((preset) => {
                  const isSelected = (advanced.qualityPreset || "Balanced") === preset;
                  return (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setAdvanced({ ...advanced, qualityPreset: preset })}
                      className={`flex flex-col items-center justify-center p-3 sm:p-3.5 min-h-[52px] rounded-xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? "border-lime bg-lime/10 dark:bg-lime/20 text-ink dark:text-white font-extrabold shadow-sm scale-[1.01]"
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

            {/* ADVANCED SETTINGS TOGGLE */}
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

            {/* CONVERT ACTION BUTTON */}
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
 * REAL-TIME CONVERSION DASHBOARD VIEW (When converting)
 */
function ConversionDashboardView({
  currentFile,
  overallProgress,
  batchElapsedTime,
  progress,
  queue,
  onCancel,
}: {
  currentFile: BatchItem;
  overallProgress: number;
  batchElapsedTime: number;
  progress: ReturnType<typeof useConverter>["progress"];
  queue: BatchItem[];
  onCancel: () => void;
}) {
  const convertingIdx = queue.findIndex((i) => i.status === "converting");
  const activeFileNumber = convertingIdx >= 0 ? convertingIdx + 1 : 1;
  const totalFiles = queue.length;
  const completedCount = queue.filter((i) => i.status === "completed").length;
  const failedCount = queue.filter((i) => i.status === "failed").length;
  const remainingCount = Math.max(
    0,
    totalFiles - completedCount - failedCount - (convertingIdx >= 0 ? 1 : 0),
  );

  const currentItemInputFormat = getItemInputFormat(currentFile);
  const currentStage = progress.stage || currentFile?.stage || "Converting Video";

  const etaDisplay =
    progress.etaSeconds && progress.etaSeconds > 0
      ? progress.etaSeconds < 5
        ? "< 5s remaining"
        : `${formatDuration(progress.etaSeconds)} remaining`
      : "Calculating ETA...";

  const estOutput = currentFile
    ? ConversionService.estimateOutputSize(
        currentFile.file.size,
        currentFile.metadata?.duration || 0,
        currentFile.outputFormat,
        currentFile.advancedSettings,
      )
    : null;

  return (
    <div className="space-y-6">
      {/* DASHBOARD HEADER BAR */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 sm:p-6 rounded-3xl bg-surface/90 dark:bg-surface-2/90 border border-ink/10 dark:border-white/10 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="relative grid h-12 w-12 place-items-center rounded-2xl bg-lime text-neutral-950 shadow-md">
            <Sparkles className="h-6 w-6 animate-spin" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-lime/20 text-neutral-950 dark:text-lime">
                Converting {activeFileNumber} of {totalFiles}
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-lime text-neutral-950 animate-pulse">
                {currentStage}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-ink dark:text-white mt-1 truncate max-w-sm sm:max-w-md">
              {currentFile.file.name}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center gap-3 text-xs font-bold text-ink dark:text-white bg-white dark:bg-surface border border-ink/10 dark:border-white/10 px-3.5 py-2 rounded-2xl shadow-xs">
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-lime" />
              <span>Elapsed: {formatTimeClock(batchElapsedTime)}</span>
            </div>
            <span className="opacity-30">|</span>
            <div className="flex items-center gap-1.5 text-lime-bright dark:text-lime">
              <Activity className="h-4 w-4 animate-pulse" />
              <span>Est: {etaDisplay}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center gap-1.5 rounded-2xl bg-red-500/10 px-4 py-2 text-xs font-bold text-red-600 dark:text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors cursor-pointer"
          >
            <Square className="h-3.5 w-3.5" />
            <span>Cancel</span>
          </button>
        </div>
      </div>

      {/* DUAL REAL-TIME PROGRESS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* BATCH OVERALL PROGRESS CARD */}
        <div className="p-5 rounded-3xl bg-white dark:bg-surface border border-ink/10 dark:border-white/10 space-y-3 shadow-xs">
          <div className="flex justify-between items-center text-xs font-black uppercase tracking-wider text-ink dark:text-white">
            <span className="flex items-center gap-1.5">
              <Layers className="h-4 w-4 text-lime" />
              Overall Batch Progress
            </span>
            <span className="text-lime-bright dark:text-lime text-base font-black">
              {overallProgress}%
            </span>
          </div>

          <div className="h-4 w-full rounded-full bg-ink/10 dark:bg-white/10 overflow-hidden p-0.5">
            <div
              className="h-full rounded-full bg-gradient-lime transition-all duration-300 shadow-sm"
              style={{ width: `${overallProgress}%` }}
            />
          </div>

          <div className="flex justify-between text-[11px] font-semibold text-ink/60 dark:text-white/60 pt-1">
            <span>
              Processing queue ({completedCount + (convertingIdx >= 0 ? 1 : 0)}/{totalFiles})
            </span>
            <span>
              {completedCount} Completed • {remainingCount} Remaining
            </span>
          </div>
        </div>

        {/* CURRENT FILE PROGRESS CARD */}
        <div className="p-5 rounded-3xl bg-white dark:bg-surface border border-ink/10 dark:border-white/10 space-y-3 shadow-xs">
          <div className="flex justify-between items-center text-xs font-black uppercase tracking-wider text-ink dark:text-white">
            <span className="flex items-center gap-1.5 truncate max-w-[200px]">
              <Film className="h-4 w-4 text-lime" />
              {currentFile.file.name}
            </span>
            <span className="text-lime-bright dark:text-lime text-base font-black">
              {progress.percentage}%
            </span>
          </div>

          <div className="h-4 w-full rounded-full bg-ink/10 dark:bg-white/10 overflow-hidden p-0.5">
            <div
              className="h-full rounded-full bg-gradient-lime transition-all duration-150 shadow-sm"
              style={{ width: `${progress.percentage}%` }}
            />
          </div>

          {/* REAL METRICS PILLS */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {progress.speed && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-lime/20 text-neutral-950 dark:text-lime text-[11px] font-black">
                <Zap className="h-3 w-3" /> {progress.speed}
              </span>
            )}
            {progress.fps && progress.fps > 0 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-surface-2 text-ink dark:text-white text-[11px] font-extrabold border border-ink/5 dark:border-white/5">
                <Gauge className="h-3 w-3 text-lime" /> {progress.fps} FPS
              </span>
            )}
            {progress.throughputMBs && progress.throughputMBs > 0 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-surface-2 text-ink dark:text-white text-[11px] font-extrabold border border-ink/5 dark:border-white/5">
                <Activity className="h-3 w-3 text-lime" /> {progress.throughputMBs} MB/s
              </span>
            )}
            {progress.threads && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-surface-2 text-ink/70 dark:text-white/70 text-[11px] font-bold">
                <Cpu className="h-3 w-3" /> {progress.threads} Threads
              </span>
            )}
          </div>
        </div>
      </div>

      {/* SMART PERFORMANCE & CONVERSION DETAILS CARD */}
      <div className="rounded-3xl bg-surface/50 dark:bg-surface-2/40 border border-ink/10 dark:border-white/10 p-5 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ink/5 dark:border-white/5 pb-2.5">
          <h4 className="text-xs font-black uppercase tracking-wider text-ink dark:text-white flex items-center gap-2">
            <Info className="h-4 w-4 text-lime" />
            Conversion Engine Reasoning & Stream Metrics
          </h4>
          <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-lime/20 text-neutral-950 dark:text-lime">
            {progress.conversionType || "Full Re-Encode"}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-2xl bg-white dark:bg-surface border border-ink/5 dark:border-white/5">
            <div className="text-[10px] font-bold text-ink/50 dark:text-white/50 uppercase">
              Input Format
            </div>
            <div className="font-black text-ink dark:text-white mt-0.5">
              {currentItemInputFormat}
            </div>
            <div className="text-[10px] text-ink/60 dark:text-white/60 mt-0.5">
              {currentFile.metadata?.sizeFormatted}
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white dark:bg-surface border border-ink/5 dark:border-white/5">
            <div className="text-[10px] font-bold text-ink/50 dark:text-white/50 uppercase">
              Target Output
            </div>
            <div className="font-black text-lime-bright dark:text-lime mt-0.5">
              ➜ {currentFile.outputFormat}
            </div>
            <div className="text-[10px] text-ink/60 dark:text-white/60 mt-0.5">
              Est. ~{estOutput?.formatted || "N/A"}
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white dark:bg-surface border border-ink/5 dark:border-white/5">
            <div className="text-[10px] font-bold text-ink/50 dark:text-white/50 uppercase">
              Resolution
            </div>
            <div className="font-black text-ink dark:text-white mt-0.5">
              {currentFile.metadata?.resolution || "1920x1080"}
            </div>
            <div className="text-[10px] text-ink/60 dark:text-white/60 mt-0.5">
              {currentFile.metadata?.fps || "30 FPS"}
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white dark:bg-surface border border-ink/5 dark:border-white/5">
            <div className="text-[10px] font-bold text-ink/50 dark:text-white/50 uppercase">
              Preset Mode
            </div>
            <div className="font-black text-ink dark:text-white mt-0.5">
              {currentFile.advancedSettings.qualityPreset}
            </div>
            <div className="text-[10px] text-ink/60 dark:text-white/60 mt-0.5">
              Client-Side WASM
            </div>
          </div>
        </div>

        <p className="text-xs font-semibold text-ink/70 dark:text-white/70 bg-white/60 dark:bg-surface/60 p-3 rounded-2xl border border-ink/5 dark:border-white/5 flex items-start gap-2">
          <Sparkles className="h-4 w-4 text-lime shrink-0 mt-0.5" />
          <span>
            {progress.explanation ||
              "Full re-encoding is active to transcode streams into the target container format safely."}
          </span>
        </p>
      </div>

      {/* LIVE BATCH QUEUE SECTION */}
      <div className="space-y-3">
        <div className="flex justify-between items-center px-1">
          <h4 className="text-xs font-black uppercase tracking-wider text-ink/60 dark:text-white/60">
            Live Queue ({queue.length} files)
          </h4>
          <div className="flex gap-2 text-[11px] font-bold text-ink/60 dark:text-white/60">
            <span>Converting: 1</span>
            <span>Completed: {completedCount}</span>
            <span>Remaining: {remainingCount}</span>
            {failedCount > 0 && <span className="text-red-500">Failed: {failedCount}</span>}
          </div>
        </div>

        <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1 scrollbar-thin">
          {queue.map((item, idx) => (
            <QueueItemRow
              key={item.id}
              item={item}
              index={idx + 1}
              isConvertingBatch={true}
              onFormatChange={NOOP_FORMAT_CHANGE}
              onRemove={NOOP_REMOVE}
              onDownload={NOOP_DOWNLOAD}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * COMPLETION SUMMARY SCREEN (When conversion finishes)
 */
function CompletionSummaryScreen({
  queue,
  stats,
  onDownloadAll,
  onDownloadItem,
  onRetryFailed,
  onRetrySingle,
  onReset,
}: {
  queue: BatchItem[];
  stats: ReturnType<typeof useConverter>["batchSummaryStats"];
  onDownloadAll: () => void;
  onDownloadItem: (id: string) => void;
  onRetryFailed: () => void;
  onRetrySingle: (id: string) => void;
  onReset: () => void;
}) {
  const completedItems = queue.filter((i) => i.status === "completed");
  const failedItems = queue.filter((i) => i.status === "failed");

  return (
    <div className="space-y-6">
      {/* HEADER HERO BANNER */}
      <div className="rounded-3xl bg-lime/20 dark:bg-lime/15 border border-lime/30 p-6 text-center space-y-3 shadow-md">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-lime text-neutral-950 text-2xl shadow-md">
          {failedItems.length > 0 ? "⚠️" : "🎉"}
        </div>

        <h3 className="text-2xl sm:text-3xl font-black text-ink dark:text-white tracking-tight">
          {failedItems.length > 0
            ? "Batch Conversion Completed with Warnings"
            : "🎉 Batch Conversion Complete!"}
        </h3>

        <p className="text-xs sm:text-sm font-medium text-ink/70 dark:text-white/80 max-w-xl mx-auto">
          Successfully processed {stats.convertedFiles} out of {stats.totalFiles} video files in{" "}
          <strong className="text-ink dark:text-white">{stats.totalBatchTimeFormatted}</strong>. All
          output files are ready for immediate browser download.
        </p>

        <div className="flex flex-wrap justify-center gap-3 pt-2">
          {stats.convertedFiles > 0 && (
            <MagneticButton
              onClick={onDownloadAll}
              className="items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-black text-white dark:bg-lime dark:text-neutral-950 dark:hover:bg-lime-bright shadow-md cursor-pointer"
            >
              <Archive className="h-4 w-4" />
              Download All ({stats.convertedFiles} Files ZIP)
            </MagneticButton>
          )}

          {failedItems.length > 0 && (
            <button
              type="button"
              onClick={onRetryFailed}
              className="inline-flex items-center gap-1.5 rounded-full bg-red-500 px-6 py-3.5 text-sm font-black text-white shadow-md hover:bg-red-600 transition-colors cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" />
              Retry Failed Files ({failedItems.length})
            </button>
          )}

          <button
            type="button"
            onClick={onReset}
            className="rounded-full bg-white px-6 py-3.5 text-sm font-bold text-ink border border-ink/15 hover:bg-surface transition-colors dark:bg-surface dark:text-white dark:border-white/20 dark:hover:bg-surface-2 shadow-sm cursor-pointer"
          >
            Start New Batch
          </button>
        </div>
      </div>

      {/* BATCH SUMMARY METRICS GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-surface/50 dark:bg-surface-2/50 border border-ink/10 dark:border-white/10 text-center">
          <div className="text-[10px] font-black uppercase text-ink/50 dark:text-white/50">
            Files Converted
          </div>
          <div className="text-xl font-black text-ink dark:text-white mt-1">
            {stats.convertedFiles} / {stats.totalFiles}
          </div>
          {failedItems.length > 0 && (
            <div className="text-[10px] font-bold text-red-500 mt-0.5">
              {failedItems.length} failed
            </div>
          )}
        </div>

        <div className="p-4 rounded-2xl bg-surface/50 dark:bg-surface-2/50 border border-ink/10 dark:border-white/10 text-center">
          <div className="text-[10px] font-black uppercase text-ink/50 dark:text-white/50">
            Total Time
          </div>
          <div className="text-xl font-black text-lime-bright dark:text-lime mt-1">
            {stats.totalBatchTimeFormatted}
          </div>
          <div className="text-[10px] font-semibold text-ink/60 dark:text-white/60 mt-0.5">
            100% Client-Side
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-surface/50 dark:bg-surface-2/50 border border-ink/10 dark:border-white/10 text-center">
          <div className="text-[10px] font-black uppercase text-ink/50 dark:text-white/50">
            Original Size
          </div>
          <div className="text-xl font-black text-ink dark:text-white mt-1">
            {stats.totalOriginalSizeFormatted}
          </div>
          <div className="text-[10px] font-semibold text-ink/60 dark:text-white/60 mt-0.5">
            Input Files Sum
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-surface/50 dark:bg-surface-2/50 border border-ink/10 dark:border-white/10 text-center">
          <div className="text-[10px] font-black uppercase text-ink/50 dark:text-white/50">
            Converted Size
          </div>
          <div className="text-xl font-black text-lime-bright dark:text-lime mt-1">
            {stats.totalOutputSizeFormatted}
          </div>
          {stats.savedSizeBytes > 0 && (
            <div className="text-[10px] font-bold text-lime-bright dark:text-lime mt-0.5">
              Saved {stats.savedSizeFormatted} (-{stats.compressionRatioPercent}%)
            </div>
          )}
        </div>
      </div>

      {/* COMPLETED FILES LIST */}
      <div className="space-y-3">
        <h4 className="text-xs font-black uppercase tracking-wider text-ink/60 dark:text-white/60 px-1">
          Converted Downloads ({completedItems.length})
        </h4>

        <div className="space-y-2.5 max-h-[320px] overflow-y-auto pr-1 scrollbar-thin">
          {completedItems.map((item, idx) => (
            <QueueItemRow
              key={item.id}
              item={item}
              index={idx + 1}
              isConvertingBatch={false}
              onFormatChange={() => {}}
              onRemove={() => {}}
              onDownload={() => onDownloadItem(item.id)}
              onRetrySingle={() => onRetrySingle(item.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * INDIVIDUAL QUEUE ROW COMPONENT
 */
const QueueItemRow = memo(function QueueItemRow({
  item,
  index,
  isConvertingBatch,
  onFormatChange,
  onRemove,
  onDownload,
  onRetrySingle,
}: {
  item: BatchItem;
  index: number;
  isConvertingBatch: boolean;
  onFormatChange: (fmt: SupportedOutputFormat) => void;
  onRemove: () => void;
  onDownload: () => void;
  onRetrySingle?: () => void;
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
        <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0 w-full sm:w-auto pt-2.5 sm:pt-0 border-t sm:border-t-0 border-ink/5 dark:border-white/5">
          {isWaiting && !isConvertingBatch ? (
            <Select
              value={item.outputFormat}
              onValueChange={(val) => onFormatChange(val as SupportedOutputFormat)}
            >
              <SelectTrigger className="h-10 sm:h-8 w-28 sm:w-28 rounded-xl bg-surface-2 border-ink/10 text-xs font-black text-ink dark:text-white dark:border-white/10 shrink-0">
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
            <div className="text-xs font-black px-2.5 py-1.5 rounded-xl bg-ink/5 dark:bg-white/10 text-ink dark:text-white shrink-0">
              ➜ {item.outputFormat}
            </div>
          )}

          <div className="flex items-center gap-2 shrink-0">
            {/* STATUS BADGE */}
            <StatusTag status={item.status} stage={item.stage} />

            {/* DOWNLOAD BUTTON FOR COMPLETED ITEM */}
            {isCompleted && (
              <button
                type="button"
                onClick={onDownload}
                className="inline-flex min-h-[40px] items-center gap-1 rounded-xl bg-lime px-3.5 py-2 text-xs font-black text-neutral-950 hover:bg-lime-bright shadow-sm cursor-pointer transition-transform active:scale-95"
              >
                <Download className="h-4 w-4" />
                <span>Download</span>
              </button>
            )}

            {/* RETRY SINGLE BUTTON FOR FAILED ITEM */}
            {isFailed && onRetrySingle && (
              <button
                type="button"
                onClick={onRetrySingle}
                className="inline-flex min-h-[40px] items-center gap-1 rounded-xl bg-red-500 px-3 py-2 text-xs font-bold text-white hover:bg-red-600 shadow-sm cursor-pointer transition-transform active:scale-95"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Retry</span>
              </button>
            )}

            {/* REMOVE BUTTON WHEN WAITING */}
            {isWaiting && !isConvertingBatch && (
              <button
                type="button"
                onClick={onRemove}
                className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-xl text-ink/40 hover:text-red-500 hover:bg-red-500/10 active:bg-red-500/20 transition-colors cursor-pointer"
                title="Remove file"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* INDIVIDUAL PROGRESS BAR */}
      {isConverting && (
        <div className="mt-3">
          <div className="flex justify-between text-[11px] font-bold text-ink/70 dark:text-white/70 mb-1">
            <span className="flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-lime animate-spin" />{" "}
              {item.stage || "Converting frame streams..."}
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
});

const StatusTag = memo(function StatusTag({
  status,
  stage,
}: {
  status: BatchItem["status"];
  stage?: string;
}) {
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
          {stage || "Converting"}
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
});

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
