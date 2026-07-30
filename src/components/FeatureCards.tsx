import { Zap, Film, Shield, Laptop, Sparkles, HeartHandshake } from "lucide-react";
import ScrollStack, { ScrollStackItem } from "./ScrollStack";

const FEATURES = [
  {
    Icon: Zap,
    title: "Crazy Fast Engine",
    desc: "Your coffee won't even get cold before conversion finishes. Powered by WebAssembly local magic.",
    bg: "bg-lime text-neutral-950",
    badge: "0.2s Processing",
  },
  {
    Icon: Film,
    title: "Tons of Formats",
    desc: "We're not judging your ancient AVI files. MP4, MOV, GIF, WEBP, MKV, MP3, WAV and dozens more.",
    bg: "bg-sunny text-neutral-950",
    badge: "50+ Formats",
  },
  {
    Icon: Shield,
    title: "100% Open Source",
    desc: "Because secrets are boring. Inspect the code, fork it, run it locally or contribute on GitHub.",
    bg: "bg-lime-bright text-neutral-950",
    badge: "MIT Licensed",
  },
  {
    Icon: Laptop,
    title: "Privacy Friendly",
    desc: "Your videos stay your business. Zero server uploads needed when converted client-side.",
    bg: "bg-ink text-lime dark:bg-lime dark:text-neutral-950",
    badge: "No Cloud Logs",
  },
];

export function FeatureCards() {
  return (
    <section className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 py-16 sm:py-24">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/80 dark:bg-surface/80 px-4 py-1.5 text-xs sm:text-sm font-bold text-ink dark:text-white shadow-sm backdrop-blur-md mb-4">
          <Sparkles className="h-4 w-4 text-lime" />
          <span>Smooth Stacking Experience</span>
        </div>
        <h2 className="text-4xl font-black text-ink sm:text-5xl lg:text-6xl dark:text-white tracking-tight">
          Why people{" "}
          <span className="rounded-2xl bg-lime px-3 text-neutral-950 font-black inline-block">
            smile
          </span>{" "}
          using it
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-base sm:text-lg text-ink/60 dark:text-white/70">
          Fast. Friendly. Free. Slightly unhinged. Scroll through the feature stack below.
        </p>
      </div>

      <ScrollStack
        useWindowScroll={true}
        itemDistance={60}
        itemScale={0.04}
        itemStackDistance={25}
        stackPosition="18%"
        scaleEndPosition="8%"
        baseScale={0.88}
        rotationAmount={1.5}
        blurAmount={0.5}
      >
        {FEATURES.map(({ Icon, title, desc, bg, badge }, idx) => (
          <ScrollStackItem
            key={title}
            itemClassName="group relative border border-ink/10 bg-white/90 dark:bg-surface/90 dark:border-white/10 p-6 sm:p-8 rounded-3xl shadow-2xl backdrop-blur-xl transition-shadow hover:shadow-lime/20"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div
                  className={`grid h-14 w-14 sm:h-16 sm:w-16 place-items-center rounded-2xl ${bg} shadow-md shrink-0`}
                >
                  <Icon className="h-7 w-7 sm:h-8 sm:w-8" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-ink/40 dark:text-white/40 mb-1">
                    Feature 0{idx + 1}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-ink dark:text-white">
                    {title}
                  </h3>
                </div>
              </div>

              <span className="inline-self-start sm:self-center rounded-full bg-ink/5 dark:bg-white/10 px-3.5 py-1 text-xs font-bold text-ink/80 dark:text-white/80 border border-ink/5 dark:border-white/10">
                {badge}
              </span>
            </div>

            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-ink/70 dark:text-white/80 leading-relaxed max-w-2xl">
              {desc}
            </p>

            <div className="mt-6 flex items-center gap-2 text-xs font-bold text-ink/50 dark:text-white/50">
              <HeartHandshake className="h-4 w-4 text-lime" />
              <span>Crafted with love for smooth media workflows</span>
            </div>
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </section>
  );
}
