import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Wrench, Bot, Hammer } from "lucide-react";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/tools")({
  head: () => ({
    meta: [
      { title: "Tools · VideoMorph — More things are cooking" },
      {
        name: "description",
        content:
          "More playful open-source video tools from VideoMorph. Currently overheating our keyboards.",
      },
      { property: "og:title", content: "VideoMorph Tools — Coming soon (probably)" },
      {
        property: "og:description",
        content: "More playful open-source video tools from VideoMorph.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ToolsPage,
});

const SUBS = [
  "We accidentally started making too many tools.",
  "Our keyboard is overheating.",
  "The hamster powering our servers needs a snack.",
  "The developer is pretending to fix bugs.",
];

function ToolsPage() {
  const wrenchRef = useRef<HTMLDivElement>(null);
  const driverRef = useRef<HTMLDivElement>(null);
  const botRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (wrenchRef.current)
      gsap.to(wrenchRef.current, {
        rotate: 15,
        y: -10,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    if (driverRef.current)
      gsap.to(driverRef.current, { rotate: 360, duration: 4, repeat: -1, ease: "none" });
    if (botRef.current)
      gsap.to(botRef.current, {
        y: -12,
        duration: 1.6,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    const t = setInterval(() => setIdx((n) => (n + 1) % SUBS.length), 2600);
    return () => clearInterval(t);
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-clip">
      <div className="relative pt-32 pb-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className="relative mx-auto h-64 w-64">
            <div className="absolute inset-0 rounded-full bg-lime blur-3xl opacity-60" />
            <div ref={botRef} className="absolute inset-0 grid place-items-center">
              <div className="grid h-40 w-40 place-items-center rounded-[2rem] bg-ink text-lime shadow-float">
                <Bot className="h-20 w-20" />
              </div>
            </div>
            <div
              ref={wrenchRef}
              className="absolute -left-4 top-6 grid h-16 w-16 place-items-center rounded-2xl bg-sunny shadow-float"
            >
              <Wrench className="h-7 w-7 text-ink" />
            </div>
            <div
              ref={driverRef}
              className="absolute -right-4 bottom-4 grid h-16 w-16 place-items-center rounded-2xl bg-lime-bright shadow-float"
            >
              <Hammer className="h-7 w-7 text-ink" />
            </div>
          </div>
          <h1 className="mt-10 text-5xl font-black text-ink sm:text-7xl">
            🛠 More Tools <span className="rounded-2xl bg-lime px-3">Are Cooking...</span>
          </h1>
          <p className="mt-6 min-h-[1.75rem] font-mono text-ink/60">{SUBS[idx]}</p>
          <Link
            to="/"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-bold text-white hover:scale-105 transition-transform"
          >
            ← Back Home
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
