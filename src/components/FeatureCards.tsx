import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Zap, Film, Shield, Laptop } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  { Icon: Zap, title: "Crazy Fast", desc: "Your coffee won't even get cold.", bg: "bg-lime" },
  {
    Icon: Film,
    title: "Tons of Formats",
    desc: "We're not judging your AVI files.",
    bg: "bg-sunny",
  },
  { Icon: Shield, title: "Open Source", desc: "Because secrets are boring.", bg: "bg-lime-bright" },
  {
    Icon: Laptop,
    title: "Privacy Friendly",
    desc: "Your videos stay your business.",
    bg: "bg-ink text-lime",
  },
];

export function FeatureCards() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const cards = ref.current.querySelectorAll("[data-card]");
    gsap.from(cards, {
      y: 60,
      opacity: 0,
      stagger: 0.1,
      duration: 0.7,
      ease: "back.out(1.5)",
      scrollTrigger: { trigger: ref.current, start: "top 80%" },
    });
  }, []);
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-6 py-20">
      <h2 className="text-center text-4xl font-black text-ink sm:text-5xl">
        Why people <span className="rounded-2xl bg-lime px-3">smile</span> using it
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-center text-ink/60">
        Fast. Friendly. Free. Slightly unhinged.
      </p>
      <div ref={ref} className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map(({ Icon, title, desc, bg }) => (
          <div
            key={title}
            data-card
            className="group rounded-3xl border border-ink/5 bg-white p-6 shadow-float transition-transform hover:-translate-y-2 hover:rotate-[-1deg]"
          >
            <div className={`grid h-14 w-14 place-items-center rounded-2xl ${bg}`}>
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-xl font-black text-ink">{title}</h3>
            <p className="mt-1 text-sm text-ink/60">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
