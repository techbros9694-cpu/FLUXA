import { Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Github } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/tools", label: "Tools" },
  { to: "/about", label: "About" },
];

export function FloatingNavbar() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "elastic.out(1, 0.6)", delay: 0.1 },
    );
    gsap.from(ref.current.querySelectorAll("[data-nav-item]"), {
      y: -10,
      opacity: 0,
      stagger: 0.06,
      duration: 0.4,
      ease: "power2.out",
      delay: 0.4,
    });
  }, []);

  return (
    <div ref={ref} className="fixed left-1/2 top-4 z-50 -translate-x-1/2 px-4">
      <nav className="flex items-center gap-1 rounded-full border border-black/5 bg-white/85 px-2 py-2 backdrop-blur-md shadow-float">
        <Link
          to="/"
          data-nav-item
          className="flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-bold text-white hover:scale-105 transition-transform"
        >
          <span>🎬</span>
          <span>VideoMorph</span>
        </Link>
        <div className="mx-1 hidden items-center gap-0.5 sm:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              data-nav-item
              activeOptions={{ exact: true }}
              activeProps={{ className: "bg-lime text-ink" }}
              className="rounded-full px-4 py-2 text-sm font-semibold text-ink/70 hover:bg-surface-2 hover:text-ink transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>
        <a
          data-nav-item
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 rounded-full bg-lime px-3 sm:px-4 py-2 text-sm font-bold text-ink hover:bg-lime-bright transition-colors"
        >
          <Github className="h-4 w-4" />
          <span className="hidden sm:inline">GitHub</span>
        </a>
      </nav>
    </div>
  );
}
