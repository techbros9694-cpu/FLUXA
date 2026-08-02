import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  Unlock,
  Code2,
  Github,
  Sparkles,
  FileCode,
  FileCheck,
  Copy,
  Check,
  Download,
  ShieldCheck,
  Building2,
  FileSpreadsheet,
  Share2,
  UserCheck,
  AlertTriangle,
} from "lucide-react";
import { ShinyText } from "@/components/ShinyText";
import { Footer } from "@/components/Footer";
import { toast } from "sonner";

export const Route = createFileRoute("/license")({
  head: () => ({
    meta: [
      { title: "MIT License · FLUEXA — Open Source & Free" },
      {
        name: "description",
        content:
          "FLUEXA is 100% open source software released under the permissive MIT License. Use, modify, and share freely.",
      },
      { property: "og:title", content: "MIT License — FLUEXA" },
      {
        property: "og:description",
        content: "Open Source. Open Ideas. Open for Everyone.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: LicensePage,
});

const MIT_TEXT = `MIT License

Copyright (c) 2026 FLUXA Open Source Project

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`;

const PERMISSIONS = [
  {
    icon: Building2,
    title: "Commercial Use",
    allowed: true,
    desc: "Use FLUEXA or its code in commercial products and paid services without restrictions.",
  },
  {
    icon: FileSpreadsheet,
    title: "Modification",
    allowed: true,
    desc: "Tweak, rewrite, or extend the codebase to fit your exact requirements.",
  },
  {
    icon: Share2,
    title: "Distribution",
    allowed: true,
    desc: "Share, bundle, or re-publish copies of the software with anyone.",
  },
  {
    icon: UserCheck,
    title: "Private Use",
    allowed: true,
    desc: "Run and modify it privately on your machine or internal company servers.",
  },
  {
    icon: AlertTriangle,
    title: "No Warranty",
    allowed: false,
    desc: "Provided 'as is' with lots of love, but without express legal warranties.",
  },
];

function LicensePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });

    if (!heroRef.current) return;
    const floats = heroRef.current.querySelectorAll("[data-float]");
    floats.forEach((el, index) => {
      gsap.to(el, {
        y: gsap.utils.random(-15, 15),
        x: gsap.utils.random(-10, 10),
        rotation: gsap.utils.random(-10, 10),
        duration: gsap.utils.random(3, 5),
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: index * 0.2,
      });
    });

    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.2 },
      );
    }
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(MIT_TEXT);
    setCopied(true);
    toast.success("License text copied to clipboard!");
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const blob = new Blob([MIT_TEXT], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "LICENSE.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success("LICENSE.txt downloaded!");
  };

  return (
    <main className="min-h-screen bg-background text-ink dark:text-white pt-24 sm:pt-28 pb-16 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="pointer-events-none absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-lime/10 rounded-full blur-3xl -z-10 dark:bg-lime/5" />
      <div className="pointer-events-none absolute top-96 right-10 w-72 h-72 bg-sunny/10 rounded-full blur-3xl -z-10 dark:bg-sunny/5" />

      {/* Hero Section */}
      <section ref={heroRef} className="relative mx-auto max-w-4xl px-4 sm:px-6 text-center">
        {/* Floating background items */}
        <div className="pointer-events-none absolute inset-0 -z-5 hidden sm:block">
          <div
            data-float
            className="absolute top-0 left-4 grid h-12 w-12 place-items-center rounded-2xl bg-lime/20 text-ink dark:text-lime border border-lime/30 shadow-md"
          >
            <Unlock className="h-6 w-6" />
          </div>
          <div
            data-float
            className="absolute top-8 right-8 grid h-12 w-12 place-items-center rounded-2xl bg-sunny/20 text-ink dark:text-sunny border border-sunny/30 shadow-md"
          >
            <Code2 className="h-6 w-6" />
          </div>
          <div
            data-float
            className="absolute bottom-4 left-12 grid h-10 w-10 place-items-center rounded-2xl bg-ink text-white dark:bg-white dark:text-neutral-950 shadow-md"
          >
            <Github className="h-5 w-5" />
          </div>
          <div
            data-float
            className="absolute bottom-10 right-16 grid h-10 w-10 place-items-center rounded-2xl bg-lime text-neutral-950 shadow-md"
          >
            <FileCode className="h-5 w-5" />
          </div>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/80 dark:bg-surface/80 px-4 py-1.5 text-xs sm:text-sm font-bold shadow-sm backdrop-blur-md mb-4">
          <Sparkles className="h-4 w-4 text-lime" />
          <span>Open Source Freedom</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-ink dark:text-white">
          📜{" "}
          <ShinyText
            text="MIT License"
            color="currentColor"
            shineColor="#a3e635"
            speed={2.5}
            className="font-black"
          />
        </h1>

        <p className="mt-4 text-lg sm:text-xl font-bold text-ink/70 dark:text-white/80 max-w-2xl mx-auto">
          Open Source. Open Ideas. Open for Everyone.
        </p>
      </section>

      {/* Note Banner */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 mt-10">
        <div className="rounded-2xl sm:rounded-3xl border border-lime/40 bg-lime/10 p-5 sm:p-6 backdrop-blur-md shadow-sm dark:bg-lime/10 dark:border-lime/30 flex items-start sm:items-center gap-4">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-lime text-neutral-950 font-black">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <p className="text-sm sm:text-base font-bold text-ink/90 dark:text-white/90 leading-relaxed">
            Good news! You can use, modify, and share FLUEXA. Just remember to keep the copyright
            notice. That&apos;s the MIT way.
          </p>
        </div>
      </section>

      {/* Main License Text Card */}
      <section ref={cardRef} className="mx-auto max-w-3xl px-4 sm:px-6 mt-8">
        <div className="rounded-[2rem] sm:rounded-[2.5rem] border border-ink/10 bg-white dark:bg-surface p-6 sm:p-8 shadow-2xl dark:border-white/10 relative">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-ink/10 dark:border-white/10">
            <div className="flex items-center gap-2">
              <FileCheck className="h-5 w-5 text-lime" />
              <span className="font-black text-sm uppercase tracking-wider text-ink/70 dark:text-white/70">
                Official License Text
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-surface/50 dark:bg-surface-2 px-3.5 py-1.5 text-xs font-bold text-ink dark:text-white hover:bg-lime hover:text-neutral-950 transition-all cursor-pointer active:scale-95 shadow-sm"
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-green-600" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
                <span>{copied ? "Copied!" : "Copy License"}</span>
              </button>

              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3.5 py-1.5 text-xs font-bold text-white hover:bg-ink/90 dark:bg-white dark:text-neutral-950 dark:hover:bg-lime transition-all cursor-pointer active:scale-95 shadow-sm"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download .txt</span>
              </button>
            </div>
          </div>

          <pre className="mt-6 p-4 sm:p-6 rounded-2xl bg-surface/60 dark:bg-surface-2/60 border border-ink/5 dark:border-white/5 font-mono text-xs sm:text-sm text-ink/80 dark:text-white/80 overflow-x-auto leading-relaxed whitespace-pre-wrap select-all">
            {MIT_TEXT}
          </pre>
        </div>
      </section>

      {/* What does MIT License mean? */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 mt-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-black text-ink dark:text-white">
            What does the MIT License mean for you?
          </h2>
          <p className="mt-2 text-sm text-ink/60 dark:text-white/70">
            No legal jargon needed — here is the quick breakdown of your rights.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {PERMISSIONS.map((perm) => {
            const Icon = perm.icon;
            return (
              <div
                key={perm.title}
                className="rounded-3xl border border-ink/10 bg-white dark:bg-surface p-5 sm:p-6 shadow-float transition-all hover:-translate-y-1 dark:border-white/10"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className={`grid h-9 w-9 place-items-center rounded-xl font-bold ${
                      perm.allowed
                        ? "bg-lime/30 text-neutral-950 dark:bg-lime dark:text-neutral-950"
                        : "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-base text-ink dark:text-white flex items-center gap-1.5">
                      <span>{perm.allowed ? "✅" : "❗"}</span>
                      {perm.title}
                    </h3>
                  </div>
                </div>
                <p className="text-xs sm:text-sm font-medium text-ink/60 dark:text-white/70 leading-relaxed">
                  {perm.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <div className="mt-20">
        <Footer />
      </div>
    </main>
  );
}
