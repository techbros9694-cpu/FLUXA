import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Github, Moon, Sun } from "lucide-react";
import { ShinyText } from "./ShinyText";

interface NavItem {
  id: string;
  label: string;
  type: "page" | "section";
  path: string;
  hash?: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home", type: "page", path: "/" },
  { id: "convert", label: "Convert", type: "section", path: "/", hash: "convert" },
  { id: "features", label: "Features", type: "section", path: "/", hash: "features" },
  { id: "faq", label: "FAQ", type: "section", path: "/", hash: "faq" },
  { id: "about", label: "About", type: "page", path: "/about" },
];

export function FloatingNavbar() {
  const ref = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");

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

  // Track scroll position to update active section on the homepage
  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection("about");
      return;
    }

    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      const convertEl = document.getElementById("convert");
      const featuresEl = document.getElementById("features");
      const faqEl = document.getElementById("faq");

      if (faqEl && scrollPos >= faqEl.offsetTop) {
        setActiveSection("faq");
      } else if (featuresEl && scrollPos >= featuresEl.offsetTop) {
        setActiveSection("features");
      } else if (convertEl && scrollPos >= convertEl.offsetTop - 100) {
        setActiveSection("convert");
      } else {
        setActiveSection("home");
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { y: -80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "elastic.out(1, 0.6)",
        delay: 0.1,
        clearProps: "transform,opacity",
      },
    );
    const items = ref.current.querySelectorAll("[data-nav-item]");
    if (items.length > 0) {
      gsap.fromTo(
        items,
        { y: -10, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.04,
          duration: 0.4,
          ease: "power2.out",
          delay: 0.2,
          clearProps: "all",
        },
      );
    }
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

  const handleNavClick = (item: NavItem) => {
    if (item.type === "page") {
      if (location.pathname === item.path) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate({ to: item.path });
      }
    } else if (item.type === "section" && item.hash) {
      if (location.pathname === "/") {
        const el = document.getElementById(item.hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        navigate({ to: "/", hash: item.hash }).then(() => {
          setTimeout(() => {
            const el = document.getElementById(item.hash!);
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }, 100);
        });
      }
    }
  };

  return (
    <div
      ref={ref}
      className="fixed left-1/2 top-2 sm:top-4 z-50 -translate-x-1/2 w-[calc(100vw-0.75rem)] sm:w-auto max-w-[96vw] sm:max-w-fit"
    >
      <nav className="w-full flex items-center justify-between gap-0.5 sm:gap-1.5 rounded-full border border-black/15 bg-white/95 p-1 sm:p-1.5 backdrop-blur-md shadow-2xl dark:bg-neutral-900/95 dark:border-white/20 whitespace-nowrap overflow-x-auto no-scrollbar">
        {/* Brand logo */}
        <Link
          to="/"
          data-nav-item
          onClick={(e) => {
            if (location.pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="flex h-7 sm:h-9 items-center gap-1 sm:gap-1.5 rounded-full bg-ink px-2 sm:px-3.5 text-[11px] sm:text-sm font-black text-white hover:scale-105 transition-transform shrink-0 dark:bg-white dark:text-neutral-950 shadow-sm"
        >
          <span className="text-[10px] sm:text-sm">🎬</span>
          <ShinyText
            text="FLUXA"
            color="currentColor"
            shineColor="#a3e635"
            speed={2.5}
            className="font-black text-[11px] sm:text-sm"
          />
        </Link>

        {/* Navigation Items (Pages & Sections) */}
        <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
          {NAV_ITEMS.map((item) => {
            const isActive =
              (location.pathname === "/about" && item.id === "about") ||
              (location.pathname === "/" && activeSection === item.id);

            return (
              <button
                key={item.id}
                type="button"
                data-nav-item
                onClick={() => handleNavClick(item)}
                className={`flex h-7 sm:h-9 items-center justify-center rounded-full px-1.5 sm:px-3 text-[11px] sm:text-sm font-bold transition-all cursor-pointer shrink-0 ${
                  isActive
                    ? "bg-lime text-neutral-950 font-black shadow-sm scale-105"
                    : "text-ink/80 hover:bg-black/5 hover:text-ink dark:text-white/80 dark:hover:bg-white/10 dark:hover:text-white"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* GitHub link button */}
        <a
          data-nav-item
          href="https://github.com/ai-playground-arc-1"
          target="_blank"
          rel="noreferrer"
          className="flex h-7 w-7 sm:h-9 sm:w-auto items-center justify-center gap-1 sm:gap-1.5 rounded-full bg-lime/20 text-ink dark:text-white hover:bg-lime hover:text-neutral-950 px-0 sm:px-3 text-xs sm:text-sm font-bold transition-all shrink-0"
          title="GitHub Repo"
        >
          <Github className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">GitHub</span>
        </a>

        {/* Dark / Light Theme Toggle Button */}
        <button
          type="button"
          data-nav-item
          onClick={toggleTheme}
          aria-label={mounted && isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          className="flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full text-ink hover:bg-black/5 dark:text-white dark:hover:bg-white/10 transition-transform active:scale-95 shrink-0"
          title={mounted && isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {mounted && isDark ? (
            <Sun className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-sunny animate-pulse" />
          ) : (
            <Moon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-ink dark:text-white" />
          )}
        </button>
      </nav>
    </div>
  );
}
