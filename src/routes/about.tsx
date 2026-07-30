import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Heart, Zap, Shield, ArrowDown } from "lucide-react";
import { FloatingIcons } from "@/components/FloatingIcons";
import { WhoWeAre } from "@/components/WhoWeAre";
import { Footer } from "@/components/Footer";
import { ShinyText } from "@/components/ShinyText";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About · FLUXA — Powered by coffee & sparks" },
      {
        name: "description",
        content:
          "Meet FLUXA — an open-source workspace built with caffeine, sparks, chaos and love.",
      },
      { property: "og:title", content: "About FLUXA" },
      {
        property: "og:description",
        content: "Open-source, playful and made with too much coffee and sparks.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const CARDS = [
  {
    title: "Our Mission",
    body: "Make video conversion ridiculously simple, ultra-fast, and completely free for everyone.",
    bg: "bg-lime text-neutral-950",
    icon: Zap,
  },
  {
    title: "Why Open Source?",
    body: "Because secrets are boring, community is awesome, and code belongs to everyone.",
    bg: "bg-sunny text-neutral-950",
    icon: Shield,
  },
  {
    title: "Why FLUXA?",
    body: 'Because "Super Mega Ultra Video Converter 9000" was already registered.',
    bg: "bg-lime-bright text-neutral-950",
    icon: Heart,
  },
  {
    title: "The Magic Spark ✨",
    body: "Instant client-side speed powered by WebAssembly, ffmpeg logic, and pure passion.",
    bg: "bg-ink text-white dark:bg-lime dark:text-neutral-950",
    icon: Sparkles,
  },
];

const TIMELINE = [
  {
    step: "Step 01",
    t: "Idea",
    e: "💡",
    desc: "Started with a broken MOV file and a dream to fix video conversion forever.",
    bg: "bg-sunny text-neutral-950",
  },
  {
    step: "Step 02",
    t: "Coffee",
    e: "☕",
    desc: "Converted 12 cups of dark roast coffee and endless snacks into clean logic.",
    bg: "bg-lime text-neutral-950",
  },
  {
    step: "Step 03",
    t: "Coding",
    e: "👨‍💻",
    desc: "Wrote thousands of lines of chaotic, love-filled TypeScript & React code.",
    bg: "bg-lime-bright text-neutral-950",
  },
  {
    step: "Step 04",
    t: "The Spark ✨",
    e: "⚡",
    desc: "Ignited the magic spark with WebAssembly, instant previews, and playful UI.",
    bg: "bg-sky-200 text-neutral-950",
  },
  {
    step: "Step 05",
    t: "Launch",
    e: "🚀",
    desc: "Released FLUXA into the wild — 100% free, open-source, and unhinged!",
    bg: "bg-amber-200 text-neutral-950",
  },
];

function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sparkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      if (sparkRef.current) {
        gsap.to(sparkRef.current, {
          rotation: 360,
          scale: 1.15,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      gsap.fromTo(
        "[data-tl]",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "back.out(1.5)",
          clearProps: "opacity,transform",
        },
      );

      gsap.fromTo(
        "[data-card]",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          clearProps: "opacity,transform",
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="relative min-h-screen overflow-x-clip bg-background pb-24">
      <FloatingIcons />

      <div className="relative z-10 pt-28 sm:pt-32">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          {/* Main Title Section with animated Spark */}
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-ink/80 shadow-float dark:bg-surface dark:text-white/90 dark:border-white/10">
                <Sparkles className="h-3.5 w-3.5 text-lime-bright animate-spin" />
                <ShinyText
                  text="About FLUXA"
                  color="currentColor"
                  shineColor="#a3e635"
                  speed={2.5}
                />
              </span>
              <h1 className="mt-4 text-4xl font-black text-ink sm:text-7xl dark:text-white leading-tight">
                Hey 👋 <br />
                We&apos;re{" "}
                <span className="inline-flex items-center gap-2 rounded-2xl bg-lime px-3 sm:px-4 py-1 text-neutral-950 shadow-float">
                  FLUXA
                  <div ref={sparkRef} className="inline-block">
                    <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-neutral-950" />
                  </div>
                </span>
              </h1>
            </div>
          </div>

          <p className="mt-6 max-w-2xl text-base sm:text-lg font-medium text-ink/80 dark:text-white/80">
            Instead of writing boring paragraphs, here are fun cards and our very serious timeline.
            You&apos;re welcome.
          </p>

          {/* Cards Grid */}
          <div className="mt-10 sm:mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CARDS.map((c) => {
              const IconComp = c.icon;
              return (
                <div
                  key={c.title}
                  data-card
                  className="group relative rounded-3xl border border-ink/10 bg-white p-6 shadow-float transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:bg-surface dark:border-white/10"
                >
                  <div
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-black uppercase shadow-sm ${c.bg}`}
                  >
                    <IconComp className="h-3.5 w-3.5" />
                    {c.title}
                  </div>
                  <p className="mt-4 text-base font-bold text-ink dark:text-white leading-relaxed">
                    {c.body}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Timeline Section */}
          <div className="mt-16 sm:mt-24 rounded-3xl border border-ink/10 bg-white/80 p-5 sm:p-12 shadow-float backdrop-blur-md dark:bg-surface/90 dark:border-white/10">
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              <Sparkles className="h-5 w-5 sm:h-7 sm:w-7 text-lime-bright animate-pulse" />
              <h2 className="text-center text-2xl font-black text-ink dark:text-white sm:text-5xl">
                <ShinyText
                  text="The (very serious) timeline"
                  color="currentColor"
                  shineColor="#a3e635"
                  speed={2.5}
                />
              </h2>
              <Sparkles className="h-5 w-5 sm:h-7 sm:w-7 text-sunny animate-pulse" />
            </div>
            <p className="mt-3 text-center text-xs sm:text-sm font-semibold text-ink/70 dark:text-white/70">
              From coffee cups to open-source video conversion magic
            </p>

            <div className="mt-8 sm:mt-12 flex flex-col items-center gap-4 sm:gap-6">
              {TIMELINE.map((s, i) => (
                <div
                  key={i}
                  data-tl
                  className="group flex flex-col items-center gap-3 w-full max-w-xl"
                >
                  <div className="flex w-full items-center justify-between gap-3 sm:gap-4 rounded-2xl border border-ink/10 bg-white p-4 sm:p-5 shadow-float transition-all hover:scale-[1.02] hover:border-lime dark:bg-surface dark:border-white/10">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div
                        className={`grid h-10 w-10 sm:h-12 sm:w-12 shrink-0 place-items-center rounded-xl text-xl sm:text-2xl shadow-sm ${s.bg}`}
                      >
                        {s.e}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] sm:text-xs font-black uppercase text-ink/60 dark:text-white/60 tracking-wider">
                            {s.step}
                          </span>
                          <span className="text-base sm:text-lg font-black text-ink dark:text-white">
                            {s.t}
                          </span>
                        </div>
                        <p className="mt-1 text-xs sm:text-sm font-medium text-ink/80 dark:text-white/80">
                          {s.desc}
                        </p>
                      </div>
                    </div>
                  </div>

                  {i < TIMELINE.length - 1 && (
                    <div className="flex flex-col items-center py-1 text-ink/40 dark:text-white/40">
                      <ArrowDown className="h-4 w-4 sm:h-5 sm:w-5 animate-bounce text-lime-bright" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <WhoWeAre />
      <Footer />
    </main>
  );
}
