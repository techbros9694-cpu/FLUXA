import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Footer } from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About · VideoMorph — Powered by coffee" },
      {
        name: "description",
        content:
          "Meet VideoMorph — an open-source video converter built with caffeine, chaos and love.",
      },
      { property: "og:title", content: "About VideoMorph" },
      {
        property: "og:description",
        content: "Open-source, playful and made with too much coffee.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const CARDS = [
  { title: "Our Mission", body: "Make video conversion ridiculously simple.", bg: "bg-lime" },
  { title: "Why Open Source?", body: "Because sharing is cool.", bg: "bg-sunny" },
  {
    title: "Why VideoMorph?",
    body: 'Because "Super Mega Ultra Video Converter 9000" was taken.',
    bg: "bg-lime-bright",
  },
];

const TIMELINE = [
  { t: "Idea", e: "💡" },
  { t: "Coffee", e: "☕" },
  { t: "Coding", e: "👨‍💻" },
  { t: "More Coffee", e: "☕" },
  { t: "Launch", e: "🚀" },
];

function AboutPage() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    gsap.from(ref.current.querySelectorAll("[data-tl]"), {
      y: 30,
      opacity: 0,
      stagger: 0.15,
      duration: 0.6,
      ease: "back.out(1.6)",
      scrollTrigger: { trigger: ref.current, start: "top 80%" },
    });
  }, []);
  return (
    <main className="relative min-h-screen overflow-x-clip">
      <div className="pt-32 pb-24">
        <div className="mx-auto max-w-4xl px-6">
          <h1 className="text-6xl font-black text-ink sm:text-7xl">
            Hey 👋 <br />
            We&apos;re <span className="rounded-2xl bg-lime px-3">VideoMorph</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink/60">
            Instead of writing boring paragraphs, here are fun cards. You&apos;re welcome.
          </p>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {CARDS.map((c) => (
              <div
                key={c.title}
                className="rounded-3xl border border-ink/5 bg-white p-6 shadow-float transition-transform hover:-translate-y-2"
              >
                <div
                  className={`inline-block rounded-full px-3 py-1 text-xs font-black uppercase ${c.bg}`}
                >
                  {c.title}
                </div>
                <p className="mt-4 text-xl font-bold text-ink">{c.body}</p>
              </div>
            ))}
          </div>
          <div ref={ref} className="mt-20">
            <h2 className="text-center text-4xl font-black text-ink">
              The (very serious) timeline
            </h2>
            <div className="mt-10 flex flex-col items-center gap-4">
              {TIMELINE.map((s, i) => (
                <div key={i} data-tl className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-4 rounded-3xl bg-white px-6 py-4 shadow-float border border-ink/5">
                    <span className="text-3xl">{s.e}</span>
                    <span className="text-xl font-black text-ink">{s.t}</span>
                  </div>
                  {i < TIMELINE.length - 1 && <span className="text-2xl text-ink/40">↓</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
