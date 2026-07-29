import { useEffect, useRef } from "react";
import gsap from "gsap";

export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const xTo = gsap.quickTo(ref.current, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(ref.current, "y", { duration: 0.5, ease: "power3" });
    const onMove = (e: MouseEvent) => {
      xTo(e.clientX - 180);
      yTo(e.clientY - 180);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-0 h-[360px] w-[360px] rounded-full opacity-60 blur-3xl"
      style={{ background: "radial-gradient(circle, var(--lime) 0%, transparent 65%)" }}
    />
  );
}
