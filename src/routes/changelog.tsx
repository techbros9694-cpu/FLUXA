import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Rocket,
  Wrench,
  PartyPopper,
  Code,
  Sparkles,
  Zap,
  CheckCircle2,
  Tag,
  ArrowRight,
  GitCommit,
} from "lucide-react";
import { ShinyText } from "@/components/ShinyText";
import { Footer } from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/changelog")({
  head: () => ({
    meta: [
      { title: "Changelog · VideoMorph — Improvements & Releases" },
      {
        name: "description",
        content:
          "See what's new in VideoMorph. Every improvement, every bug squashed, every tiny victory.",
      },
      { property: "og:title", content: "Changelog — VideoMorph" },
      {
        property: "og:description",
        content: "Every improvement. Every bug squashed. Every tiny victory.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ChangelogPage,
});

interface ChangelogVersion {
  version: string;
  badge: string;
  badgeColor: string;
  title: string;
  date: string;
  tagline: string;
  changes: {
    category: "feature" | "fix" | "perf" | "ui";
    text: string;
  }[];
}

const VERSIONS: ChangelogVersion[] = [
  {
    version: "1.2.0",
    badge: "🚀 Major Engine Update",
    badgeColor: "bg-lime text-neutral-950",
    title: "⚙️ VideoMorph Core Engine Architecture",
    date: "August 2026",
    tagline:
      "Single core processing engine powering all media operations, smart lossless stream copy, and pristine quality profiles.",
    changes: [
      {
        category: "feature",
        text: "Architected the unified VideoMorph Engine: modular processing backend powering Video Converter, Compressor, Trimmer, Audio Extractor, GIF tools, and utilities.",
      },
      {
        category: "perf",
        text: "Smart Decision Engine: automatic 100% loss-less Stream Copy (remuxing) when codecs match target container for instant conversion.",
      },
      {
        category: "feature",
        text: "High-Fidelity Quality Profiles: default CRF 19 (H.264) and CRF 21 (H.265) presets ensuring pristine video & audio quality without unintended compression.",
      },
      {
        category: "fix",
        text: "VP9/WebM Encoding Engine: upgraded to libopus audio, yuv420p pixel format, tile-columns, and row-mt for fast, compliant WebM output.",
      },
      {
        category: "feature",
        text: "Robust Output Quality Verification: automated EBML, MP4 container header checks, and payload size validation before user download.",
      },
      {
        category: "perf",
        text: "Dedicated Web Worker & Memory Manager: off-thread WASM execution with automatic Blob URL revocation to prevent memory leaks.",
      },
      {
        category: "feature",
        text: "Reusable Job Queue & Error System: background queue tracking, stage progress callbacks, and structured error handling.",
      },
    ],
  },
  {
    version: "1.1.0",
    badge: "✨ Feature Release",
    badgeColor: "bg-sunny text-neutral-950",
    title: "✨ Quality of Life",
    date: "July 2026",
    tagline: "Smarter error handling, better mobile touch controls, and accessibility wins.",
    changes: [
      { category: "feature", text: "Better error messages & automatic recovery hints" },
      { category: "ui", text: "Improved video format compatibility & media container detection" },
      { category: "ui", text: "Accessibility improvements & full keyboard navigation support" },
      { category: "perf", text: "Mobile touch control refinements & responsive navbar layout" },
      { category: "ui", text: "Added dedicated MIT License, Privacy Policy, and Changelog pages" },
    ],
  },
  {
    version: "1.0.1",
    badge: "⚡ Patch Release",
    badgeColor: "bg-sunny text-neutral-950",
    title: "⚡ Performance Improvements",
    date: "June 2026",
    tagline: "Faster WebAssembly load times, memory leak cleanups, and smoother downloads.",
    changes: [
      {
        category: "perf",
        text: "Faster FFmpeg.wasm multi-thread initialization",
      },
      {
        category: "perf",
        text: "In-browser memory optimization & automatic Blob URL cleanup",
      },
      {
        category: "fix",
        text: "Better high-bitrate video download handling & filename sanitization",
      },
      {
        category: "ui",
        text: "UI polish, theme switching enhancements, and smoother GSAP animations",
      },
      {
        category: "fix",
        text: "Fixed edge-case conversion hangs on unusual container aspect ratios",
      },
    ],
  },
  {
    version: "1.0.0",
    badge: "🎉 Initial Launch",
    badgeColor: "bg-ink text-white dark:bg-white dark:text-neutral-950",
    title: "🎉 Initial Release",
    date: "May 2026",
    tagline: "The birth of VideoMorph: private, browser-based video conversion without tears.",
    changes: [
      {
        category: "feature",
        text: "Browser-based video conversion powered by FFmpeg.wasm",
      },
      {
        category: "feature",
        text: "Interactive Drag & Drop file upload with instant format detection",
      },
      {
        category: "feature",
        text: "Multiple output formats: MP4, WEBM, GIF, MP3, AVI, MOV, MKV",
      },
      {
        category: "ui",
        text: "Playful design system with GSAP animations, magnetic buttons, and theme toggle",
      },
      {
        category: "perf",
        text: "Fully responsive layout across Desktop, Tablet, and Mobile devices",
      },
      {
        category: "feature",
        text: "100% privacy-first local processing with zero server uploads",
      },
      {
        category: "feature",
        text: "Open-source codebase under the MIT License",
      },
    ],
  },
];

function ChangelogPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

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

    if (timelineRef.current) {
      const items = timelineRef.current.querySelectorAll("[data-timeline-item]");
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }
  }, []);

  return (
    <main className="min-h-screen bg-background text-ink dark:text-white pt-24 sm:pt-28 pb-16 relative overflow-hidden">
      {/* Background glow blobs */}
      <div className="pointer-events-none absolute top-20 left-1/2 -translate-x-1/2 w-[32rem] h-[32rem] bg-lime/10 rounded-full blur-3xl -z-10 dark:bg-lime/5" />
      <div className="pointer-events-none absolute top-[40rem] left-10 w-80 h-80 bg-sunny/10 rounded-full blur-3xl -z-10 dark:bg-sunny/5" />

      {/* Hero Section */}
      <section ref={heroRef} className="relative mx-auto max-w-4xl px-4 sm:px-6 text-center">
        {/* Floating background icons & version badges */}
        <div className="pointer-events-none absolute inset-0 -z-5 hidden sm:block">
          <div
            data-float
            className="absolute top-0 left-6 grid h-12 w-12 place-items-center rounded-2xl bg-lime/20 text-neutral-950 dark:text-lime border border-lime/30 shadow-md"
          >
            <Rocket className="h-6 w-6" />
          </div>
          <div
            data-float
            className="absolute top-8 right-8 grid h-12 w-12 place-items-center rounded-2xl bg-sunny/20 text-neutral-950 dark:text-sunny border border-sunny/30 shadow-md"
          >
            <PartyPopper className="h-6 w-6" />
          </div>
          <div
            data-float
            className="absolute bottom-2 left-12 grid h-10 w-10 place-items-center rounded-2xl bg-ink text-lime dark:bg-surface dark:text-lime border border-lime/30 shadow-md"
          >
            <Wrench className="h-5 w-5" />
          </div>
          <div
            data-float
            className="absolute bottom-6 right-16 grid h-10 w-10 place-items-center rounded-2xl bg-lime text-neutral-950 shadow-md"
          >
            <Code className="h-5 w-5" />
          </div>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/80 dark:bg-surface/80 px-4 py-1.5 text-xs sm:text-sm font-bold shadow-sm backdrop-blur-md mb-4">
          <Sparkles className="h-4 w-4 text-lime" />
          <span>Release Notes & Progress</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-ink dark:text-white">
          🚀{" "}
          <ShinyText
            text="Changelog"
            color="currentColor"
            shineColor="#a3e635"
            speed={2.5}
            className="font-black"
          />
        </h1>

        <p className="mt-4 text-lg sm:text-xl font-bold text-ink/70 dark:text-white/80 max-w-2xl mx-auto leading-relaxed">
          &ldquo;Every improvement. Every bug squashed. Every tiny victory.&rdquo;
        </p>
      </section>

      {/* GitHub-style Timeline Section */}
      <section ref={timelineRef} className="mx-auto max-w-3xl px-4 sm:px-6 mt-14 sm:mt-16">
        <div className="relative border-l-2 border-ink/10 dark:border-white/10 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {VERSIONS.map((ver) => (
            <div key={ver.version} data-timeline-item className="relative group">
              {/* Timeline marker node */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white dark:bg-surface border-2 border-lime text-neutral-950 shadow-md group-hover:scale-125 transition-transform">
                <GitCommit className="h-4 w-4 text-lime-bright stroke-[3]" />
              </div>

              {/* Version Card */}
              <div className="rounded-[2rem] border border-ink/10 bg-white dark:bg-surface p-6 sm:p-8 shadow-float transition-all duration-300 hover:shadow-2xl dark:border-white/10">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-ink/10 dark:border-white/10">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl sm:text-3xl font-black text-ink dark:text-white">
                      v{ver.version}
                    </span>

                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-black shadow-sm ${ver.badgeColor}`}
                    >
                      <Tag className="h-3 w-3" />
                      {ver.badge}
                    </span>
                  </div>

                  <span className="text-xs sm:text-sm font-bold text-ink/50 dark:text-white/50">
                    {ver.date}
                  </span>
                </div>

                <div className="mt-4">
                  <h2 className="text-lg sm:text-xl font-black text-ink dark:text-white">
                    {ver.title}
                  </h2>
                  <p className="mt-1 text-xs sm:text-sm font-medium text-ink/60 dark:text-white/70">
                    {ver.tagline}
                  </p>
                </div>

                <ul className="mt-6 space-y-2.5">
                  {ver.changes.map((ch, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-ink/80 dark:text-white/80"
                    >
                      <CheckCircle2 className="h-4 w-4 text-lime shrink-0 mt-0.5" />
                      <span>{ch.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GitHub Call to Action */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 mt-16 sm:mt-20">
        <div className="rounded-3xl border border-ink/10 bg-surface/80 dark:bg-surface-2/80 p-6 sm:p-8 text-center backdrop-blur-md shadow-sm dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h3 className="font-black text-lg text-ink dark:text-white">
              Want to see real-time commits & releases?
            </h3>
            <p className="text-xs sm:text-sm text-ink/60 dark:text-white/70">
              Check out our complete git history on GitHub!
            </p>
          </div>

          <a
            href="https://github.com/ai-playground-arc-1"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-xs sm:text-sm font-black text-white hover:bg-lime hover:text-neutral-950 dark:bg-white dark:text-neutral-950 dark:hover:bg-lime transition-all shrink-0 cursor-pointer shadow-md active:scale-95"
          >
            <span>View GitHub Releases</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      <div className="mt-20">
        <Footer />
      </div>
    </main>
  );
}
