import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Github, Moon, Sun } from "lucide-react";
import { ShinyText } from "./ShinyText";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
];

export function FloatingNavbar() {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (stored === "dark" || (!stored && prefersDark)) {
        setIsDark(true);
        document.documentElement.classList.add("dark");
      } else {
        setIsDark(false);
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "elastic.out(1, 0.6)", delay: 0.1 },
    );
    gsap.from(ref.current.querySelectorAll("[data-nav-item]"), {
      y: -10,
      opacity: 0,
      stagger: 0.05,
      duration: 0.4,
      ease: "power2.out",
      delay: 0.3,
    });
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return next;
    });
  };

  return (
    <div
      ref={ref}
      className="fixed left-1/2 top-3 sm:top-4 z-50 -translate-x-1/2 px-2 max-w-[98vw] sm:max-w-fit"
    >
      <nav className="flex items-center justify-between gap-1 sm:gap-2 rounded-full border border-black/10 bg-white/95 p-1 sm:p-1.5 backdrop-blur-md shadow-float dark:bg-surface/95 dark:border-white/20 dark:shadow-2xl whitespace-nowrap">
        {/* Brand logo */}
        <Link
          to="/"
          data-nav-item
          className="flex h-8 sm:h-10 items-center gap-1 sm:gap-1.5 rounded-full bg-ink px-2.5 sm:px-4 text-xs sm:text-sm font-black text-white hover:scale-105 transition-transform shrink-0 dark:bg-white dark:text-neutral-950"
        >
          <span className="text-xs sm:text-base">🎬</span>
          <ShinyText
            text="FLUXA"
            color="currentColor"
            shineColor="#a3e635"
            speed={2.5}
            className="font-black"
          />
        </Link>

        {/* Links section */}
        <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              data-nav-item
              activeOptions={{ exact: true }}
              activeProps={{ className: "!bg-lime !text-neutral-950 font-black shadow-sm" }}
              className="flex h-8 sm:h-10 items-center justify-center rounded-full px-2.5 sm:px-4 text-xs sm:text-sm font-bold text-ink/80 hover:bg-black/5 hover:text-ink transition-colors dark:text-white dark:hover:bg-white/10"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* GitHub link button */}
        <a
          data-nav-item
          href="https://github.com/ai-playground-arc-1"
          target="_blank"
          rel="noreferrer"
          className="flex h-8 sm:h-10 items-center gap-1 sm:gap-1.5 rounded-full bg-lime px-2.5 sm:px-4 text-xs sm:text-sm font-bold text-neutral-950 hover:bg-lime-bright transition-colors shrink-0"
        >
          <Github className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          <span className="hidden xs:inline">GitHub</span>
        </a>

        {/* Dark / Light Theme Toggle Button */}
        <button
          type="button"
          data-nav-item
          onClick={toggleTheme}
          aria-label={mounted && isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full text-ink hover:bg-black/5 dark:text-white dark:hover:bg-white/10 transition-transform active:scale-95 shrink-0"
          title={mounted && isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {mounted && isDark ? (
            <Sun className="h-4 w-4 sm:h-5 sm:w-5 text-sunny animate-pulse" />
          ) : (
            <Moon className="h-4 w-4 sm:h-5 sm:w-5 text-ink dark:text-white" />
          )}
        </button>
      </nav>
    </div>
  );
}
