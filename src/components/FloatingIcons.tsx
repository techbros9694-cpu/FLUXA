import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Camera, Film, Play, Video, Clapperboard, Popcorn, Sparkles } from "lucide-react";

const icons = [
  { Icon: Camera, top: "10%", left: "6%", color: "bg-lime" },
  { Icon: Film, top: "22%", left: "88%", color: "bg-sunny" },
  { Icon: Play, top: "60%", left: "4%", color: "bg-lime-bright" },
  { Icon: Video, top: "72%", left: "90%", color: "bg-ink text-lime" },
  { Icon: Clapperboard, top: "40%", left: "92%", color: "bg-lime" },
  { Icon: Popcorn, top: "82%", left: "18%", color: "bg-sunny" },
  { Icon: Sparkles, top: "8%", left: "70%", color: "bg-lime-bright" },
];

export function FloatingIcons() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const els = ref.current.querySelectorAll<HTMLElement>("[data-float]");
    els.forEach((el) => {
      gsap.to(el, {
        y: gsap.utils.random(-30, 30),
        x: gsap.utils.random(-20, 20),
        rotation: gsap.utils.random(-15, 15),
        duration: gsap.utils.random(3, 6),
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    });
  }, []);
  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden">
      {icons.map(({ Icon, top, left, color }, i) => (
        <div
          key={i}
          data-float
          className={`absolute grid h-14 w-14 place-items-center rounded-2xl ${color} text-ink shadow-float`}
          style={{ top, left }}
        >
          <Icon className="h-6 w-6" />
        </div>
      ))}
    </div>
  );
}
