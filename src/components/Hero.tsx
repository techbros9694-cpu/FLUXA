import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FloatingIcons } from "./FloatingIcons";

const SUBTITLES = [
  "Making MP4s behave since today.",
  "We politely convince videos to change clothes.",
  "No videos were harmed during conversion.",
  "Definitely faster than explaining formats to your parents.",
  "The pixels signed the agreement.",
];

export function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!headingRef.current) return;
    const words = headingRef.current.querySelectorAll("[data-word]");
    gsap.from(words, {
      y: 60,
      opacity: 0,
      rotate: -6,
      stagger: 0.08,
      duration: 0.9,
      ease: "back.out(1.6)",
    });
  }, []);

  useEffect(() => {
    const full = SUBTITLES[idx];
    let i = 0;
    setText("");
    const typer = setInterval(() => {
      i++;
      setText(full.slice(0, i));
      if (i >= full.length) clearInterval(typer);
    }, 35);
    const hold = setTimeout(() => setIdx((n) => (n + 1) % SUBTITLES.length), 3800);
    return () => {
      clearInterval(typer);
      clearTimeout(hold);
    };
  }, [idx]);

  const headline = "Convert Videos Without Crying.".split(" ");

  return (
    <section className="relative overflow-hidden pt-32 pb-16">
      <FloatingIcons />
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-ink/70 shadow-float dark:bg-surface dark:text-white/90 dark:border-white/10">
          <span className="h-2 w-2 rounded-full bg-lime-bright animate-pulse" />
          Open source · v0.0.chaotic
        </span>
        <h1
          ref={headingRef}
          className="mt-6 text-5xl font-black leading-[0.95] text-ink sm:text-7xl md:text-8xl dark:text-white"
        >
          {headline.map((w, i) => (
            <span key={i} data-word className="mr-3 inline-block">
              {w === "Crying." ? (
                <span className="relative inline-block text-neutral-950">
                  <span className="relative z-10">Crying.</span>
                  <span className="absolute inset-x-0 bottom-1 -z-0 h-4 -skew-x-6 bg-lime" />
                </span>
              ) : (
                w
              )}
            </span>
          ))}
        </h1>
        <p className="mt-6 text-lg font-medium text-ink/70 sm:text-xl dark:text-white/80">
          MP4? MOV? AVI? MKV? Yeah… we got you.
        </p>
        <p className="mt-3 min-h-[1.75rem] text-base text-ink/60 font-mono dark:text-white/70">
          {text}
          <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-ink dark:bg-lime" />
        </p>
      </div>
    </section>
  );
}
