import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 999, suffix: "+", label: "Coffee cups consumed" },
  { value: 12, suffix: "M+", label: "Pixels transformed*" },
  { value: 100, suffix: "%", label: "Open Source" },
  { value: -1, suffix: "∞", label: "Bad format jokes" },
];

export function StatsCounters() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const nums = ref.current.querySelectorAll<HTMLElement>("[data-num]");
    nums.forEach((el) => {
      const target = Number(el.dataset.num);
      if (target < 0) return;
      const obj = { v: 0 };
      gsap.to(obj, {
        v: target,
        duration: 2,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = Math.floor(obj.v).toString();
        },
        scrollTrigger: { trigger: el, start: "top 85%" },
      });
    });
  }, []);
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-6 py-20">
      <div
        ref={ref}
        className="grid grid-cols-2 gap-4 rounded-[2.5rem] bg-ink p-8 text-center md:grid-cols-4"
      >
        {STATS.map((s) => (
          <div key={s.label} className="rounded-3xl bg-white/5 p-6">
            <div className="text-5xl font-black text-lime">
              {s.value < 0 ? (
                <span>{s.suffix}</span>
              ) : (
                <>
                  <span data-num={s.value}>0</span>
                  {s.suffix}
                </>
              )}
            </div>
            <p className="mt-2 text-sm font-semibold text-white/70">{s.label}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-xs text-ink/40">*probably</p>
    </section>
  );
}
