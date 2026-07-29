import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Upload, Sparkles, Download } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MagneticButton } from "./MagneticButton";
import { simulateConversion, LOADING_LINES, type ConvertResult } from "@/lib/mock-converter";
import { toast } from "sonner";

const FORMATS = [
  "MP4",
  "MOV",
  "AVI",
  "MKV",
  "WEBM",
  "GIF",
  "FLV",
  "WMV",
  "3GP",
  "MPEG",
  "OGV",
  "M4V",
];
const RES = ["Keep original", "4K (2160p)", "1080p", "720p", "480p", "360p"];
const QUAL = ["Cinema", "High", "Balanced", "Small file"];
const CODECS = ["H.264", "H.265 / HEVC", "VP9", "AV1", "ProRes"];

const DROP_PROMPTS = [
  "Drag your video here.",
  "Throw it gently.",
  "Please don't actually throw your laptop.",
  "Drop your masterpiece.",
];

type Phase = "idle" | "converting" | "done";

export function ConverterPanel() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [pct, setPct] = useState(0);
  const [label, setLabel] = useState(LOADING_LINES[0]);
  const [filename, setFilename] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [promptIdx, setPromptIdx] = useState(0);
  const [from, setFrom] = useState("MOV");
  const [to, setTo] = useState("MP4");
  const [res, setRes] = useState(RES[2]);
  const [q, setQ] = useState(QUAL[1]);
  const [codec, setCodec] = useState(CODECS[0]);
  const [result, setResult] = useState<ConvertResult | null>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setInterval(() => setPromptIdx((n) => (n + 1) % DROP_PROMPTS.length), 3200);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!dropRef.current) return;
    gsap.to(dropRef.current, {
      scale: dragging ? 1.02 : 1,
      duration: 0.4,
      ease: "elastic.out(1, 0.5)",
    });
  }, [dragging]);

  const start = async () => {
    setPhase("converting");
    setPct(0);
    const r = await simulateConversion(
      { from, to, resolution: res, quality: q, codec, filename: filename ?? undefined },
      (p, l) => {
        setPct(p);
        setLabel(l);
      },
    );
    setResult(r);
    setPhase("done");
  };

  const reset = () => {
    setPhase("idle");
    setPct(0);
    setResult(null);
    setFilename(null);
  };

  return (
    <section id="convert" className="relative z-10 mx-auto max-w-4xl px-6 pb-20">
      <div className="rounded-[2.5rem] border border-ink/5 bg-white p-6 sm:p-10 shadow-float">
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
            if (f) setFilename(f.name);
          }}
          className={`relative rounded-[2rem] border-4 border-dashed p-10 text-center transition-colors ${
            dragging
              ? "border-lime-bright bg-lime/20"
              : "border-ink/15 bg-surface hover:bg-surface-2"
          }`}
        >
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-ink text-lime shadow-float">
            <Upload className="h-8 w-8" />
          </div>
          <p className="mt-5 text-2xl font-black text-ink">
            📂 {filename ? filename : "Drop your masterpiece here"}
          </p>
          <p className="mt-2 text-sm font-medium text-ink/60">{DROP_PROMPTS[promptIdx]}</p>
          <label className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white hover:scale-105 transition-transform">
            Or pick a file
            <input
              type="file"
              className="hidden"
              onChange={(e) => setFilename(e.target.files?.[0]?.name ?? null)}
            />
          </label>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-5">
          <Field label="From">
            <Select value={from} onValueChange={setFrom}>
              <SelectTrigger className="rounded-2xl bg-surface-2 border-0 h-12 font-bold text-ink">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FORMATS.map((f) => (
                  <SelectItem key={f} value={f}>
                    {f}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="To">
            <Select value={to} onValueChange={setTo}>
              <SelectTrigger className="rounded-2xl bg-lime border-0 h-12 font-bold text-ink">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FORMATS.map((f) => (
                  <SelectItem key={f} value={f}>
                    {f}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Resolution">
            <Select value={res} onValueChange={setRes}>
              <SelectTrigger className="rounded-2xl bg-surface-2 border-0 h-12 font-bold text-ink">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {RES.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Quality">
            <Select value={q} onValueChange={setQ}>
              <SelectTrigger className="rounded-2xl bg-surface-2 border-0 h-12 font-bold text-ink">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {QUAL.map((x) => (
                  <SelectItem key={x} value={x}>
                    {x}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Codec">
            <Select value={codec} onValueChange={setCodec}>
              <SelectTrigger className="rounded-2xl bg-surface-2 border-0 h-12 font-bold text-ink">
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
        </div>

        <div className="mt-8">
          {phase === "idle" && (
            <MagneticButton
              onClick={start}
              className="w-full items-center justify-center rounded-full bg-gradient-lime px-8 py-5 text-xl font-black text-ink shadow-float hover:brightness-105"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Let&apos;s Do Some Movie Magic
            </MagneticButton>
          )}

          {phase === "converting" && (
            <div className="rounded-3xl bg-surface p-6">
              <div className="flex items-center justify-between text-sm font-bold text-ink">
                <span className="truncate pr-2">{label}</span>
                <span>{Math.floor(pct)}%</span>
              </div>
              <div className="mt-3 h-4 w-full overflow-hidden rounded-full bg-white">
                <div
                  className="h-full rounded-full transition-[width] duration-150"
                  style={{ width: `${pct}%`, background: "var(--gradient-lime)" }}
                />
              </div>
            </div>
          )}

          {phase === "done" && result && (
            <div className="flex flex-col items-center gap-3 rounded-3xl bg-lime/40 p-6 text-center">
              <p className="text-2xl font-black text-ink">🎉 Done pretending!</p>
              <p className="text-sm text-ink/70">
                Your fake file: <b>{result.filename}</b>
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <MagneticButton
                  onClick={() =>
                    toast("Told you it was fake 😅", {
                      description: "This is a UI-only demo. Backend coming soon.",
                    })
                  }
                  className="items-center gap-2 rounded-full bg-ink px-6 py-3 text-base font-bold text-white"
                >
                  <Download className="h-4 w-4" />
                  Download Totally Real File
                </MagneticButton>
                <button
                  onClick={reset}
                  className="rounded-full bg-white px-6 py-3 text-base font-bold text-ink border border-ink/10"
                >
                  Convert another
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-ink/50">
        {label}
      </label>
      {children}
    </div>
  );
}
