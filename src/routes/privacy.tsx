import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  Shield,
  Lock,
  FolderCheck,
  Globe,
  Sparkles,
  Cpu,
  UserX,
  EyeOff,
  Cookie,
  Code,
  Heart,
} from "lucide-react";
import { ShinyText } from "@/components/ShinyText";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy · FLUEXA — Your Media Stays Yours" },
      {
        name: "description",
        content:
          "FLUEXA processes media 100% inside your browser. No server uploads, no accounts, no tracking, total privacy.",
      },
      { property: "og:title", content: "Privacy Policy — FLUEXA" },
      {
        property: "og:description",
        content: "Your videos stay on your device. Always.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: PrivacyPage,
});

const SECTIONS = [
  {
    icon: Cpu,
    emoji: "⚡",
    title: "Local Processing",
    desc: "Every single frame of your video is converted directly inside your browser using WebAssembly (FFmpeg.wasm). Your computer's CPU handles all processing locally.",
  },
  {
    icon: Shield,
    emoji: "🛡",
    title: "No Uploads Ever",
    desc: "Your videos never leave your device. Zero bytes are uploaded to remote servers, external APIs, or cloud storage. What happens in your browser stays in your browser.",
  },
  {
    icon: UserX,
    emoji: "🔒",
    title: "No Accounts Required",
    desc: "No passwords, no email registrations, and no login portals. You open FLUEXA, drop your video, convert, and download. That's all.",
  },
  {
    icon: EyeOff,
    emoji: "📂",
    title: "No Content Tracking",
    desc: "We do not track, log, analyze, or fingerprint your video files, file names, metadata, or media contents. We literally have no idea what videos you convert.",
  },
  {
    icon: Cookie,
    emoji: "💻",
    title: "Simple Cookies & Storage",
    desc: "We only use your browser's local storage for simple user preferences like remembering whether you prefer Light or Dark mode. No tracking cookies.",
  },
  {
    icon: Code,
    emoji: "💚",
    title: "Open Source Transparency",
    desc: "Because FLUEXA is 100% open source under the MIT License, you don't have to trust our words — you can inspect every line of code on GitHub yourself.",
  },
];

function PrivacyPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

    if (cardsRef.current) {
      const children = cardsRef.current.querySelectorAll("[data-card]");
      gsap.fromTo(
        children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.7,
          ease: "power2.out",
          delay: 0.2,
        },
      );
    }
  }, []);

  return (
    <main className="min-h-screen bg-background text-ink dark:text-white pt-24 sm:pt-28 pb-16 relative overflow-hidden">
      {/* Background glow blobs */}
      <div className="pointer-events-none absolute top-20 left-1/2 -translate-x-1/2 w-[30rem] h-[30rem] bg-lime/10 rounded-full blur-3xl -z-10 dark:bg-lime/5" />
      <div className="pointer-events-none absolute top-[30rem] right-4 w-80 h-80 bg-sunny/10 rounded-full blur-3xl -z-10 dark:bg-sunny/5" />

      {/* Hero Section */}
      <section ref={heroRef} className="relative mx-auto max-w-4xl px-4 sm:px-6 text-center">
        {/* Floating background icons */}
        <div className="pointer-events-none absolute inset-0 -z-5 hidden sm:block">
          <div
            data-float
            className="absolute top-2 left-6 grid h-12 w-12 place-items-center rounded-2xl bg-lime/20 text-ink dark:text-lime border border-lime/30 shadow-md"
          >
            <Shield className="h-6 w-6" />
          </div>
          <div
            data-float
            className="absolute top-10 right-10 grid h-12 w-12 place-items-center rounded-2xl bg-sunny/20 text-ink dark:text-sunny border border-sunny/30 shadow-md"
          >
            <Lock className="h-6 w-6" />
          </div>
          <div
            data-float
            className="absolute bottom-2 left-14 grid h-10 w-10 place-items-center rounded-2xl bg-ink text-lime dark:bg-surface dark:text-lime border border-lime/30 shadow-md"
          >
            <FolderCheck className="h-5 w-5" />
          </div>
          <div
            data-float
            className="absolute bottom-6 right-16 grid h-10 w-10 place-items-center rounded-2xl bg-lime text-neutral-950 shadow-md"
          >
            <Globe className="h-5 w-5" />
          </div>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/80 dark:bg-surface/80 px-4 py-1.5 text-xs sm:text-sm font-bold shadow-sm backdrop-blur-md mb-4">
          <Sparkles className="h-4 w-4 text-lime" />
          <span>Zero Server Uploads</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-ink dark:text-white">
          🔒{" "}
          <ShinyText
            text="Your Videos Stay Yours."
            color="currentColor"
            shineColor="#a3e635"
            speed={2.5}
            className="font-black"
          />
        </h1>

        <p className="mt-4 text-lg sm:text-xl font-bold text-ink/70 dark:text-white/80 max-w-2xl mx-auto leading-relaxed">
          &ldquo;We don&apos;t upload your videos. We don&apos;t spy on them. We don&apos;t even
          know what they are.&rdquo;
        </p>
      </section>

      {/* Feature Sections Grid */}
      <section ref={cardsRef} className="mx-auto max-w-4xl px-4 sm:px-6 mt-14 sm:mt-16">
        <div className="grid gap-6 sm:grid-cols-2">
          {SECTIONS.map((sec) => {
            const Icon = sec.icon;
            return (
              <div
                key={sec.title}
                data-card
                className="group relative rounded-3xl border border-ink/10 bg-white dark:bg-surface p-6 sm:p-8 shadow-float transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl dark:border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-lime/20 text-neutral-950 dark:bg-lime dark:text-neutral-950 font-black shadow-sm group-hover:scale-110 transition-transform">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-2xl">{sec.emoji}</span>
                  </div>

                  <h2 className="text-xl font-black text-ink dark:text-white mb-2">{sec.title}</h2>

                  <p className="text-sm font-medium text-ink/70 dark:text-white/70 leading-relaxed">
                    {sec.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Privacy Promise Banner */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 mt-16 sm:mt-20">
        <div className="rounded-[2.5rem] border-2 border-lime bg-ink text-white p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden dark:bg-surface-2 dark:border-lime">
          <div className="pointer-events-none absolute -right-10 -bottom-10 h-40 w-40 bg-lime/20 rounded-full blur-2xl" />

          <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-lime text-neutral-950 font-black mb-4">
            <Heart className="h-6 w-6 fill-neutral-950" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">Privacy Promise 💚</h2>

          <p className="text-base sm:text-lg font-bold text-white/90 max-w-lg mx-auto leading-relaxed">
            &ldquo;We built FLUEXA because your media belongs to you—not to us.&rdquo;
          </p>

          <p className="mt-4 text-xs font-semibold text-lime/80 uppercase tracking-widest">
            Privacy-first • Open Source • Pure Browser Execution
          </p>
        </div>
      </section>

      <div className="mt-20">
        <Footer />
      </div>
    </main>
  );
}
