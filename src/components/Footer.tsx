import { Github, Heart, Coffee } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ShinyText } from "./ShinyText";
import { FluxaLogo } from "./FluxaLogo";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-ink/5 bg-white dark:bg-surface dark:border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 text-xl font-black text-ink dark:text-white">
              <FluxaLogo size={28} />
              <ShinyText
                text="FLUEXA"
                color="currentColor"
                shineColor="#a3e635"
                speed={2.5}
                className="font-black"
              />
            </div>
            <p className="mt-3 text-sm text-ink/60 max-w-xs dark:text-white/70">
              Made with <Heart className="inline h-4 w-4 fill-lime-bright text-lime-bright" /> and
              powered by <Coffee className="inline h-4 w-4" /> + open source.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-black uppercase tracking-wider text-ink dark:text-white">
              Community
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-ink/60 dark:text-white/70">
              <li>
                <Link
                  className="hover:text-ink dark:hover:text-white transition-colors"
                  to="/about"
                >
                  About Us
                </Link>
              </li>
              <li>
                <a
                  className="hover:text-ink dark:hover:text-white transition-colors"
                  href="https://github.com/ai-playground-arc-1"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub Organization
                </a>
              </li>
              <li>
                <a
                  className="hover:text-ink dark:hover:text-white transition-colors"
                  href="https://github.com/ai-playground-arc-1"
                  target="_blank"
                  rel="noreferrer"
                >
                  Contribute
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-black uppercase tracking-wider text-ink dark:text-white">
              Boring stuff
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-ink/60 dark:text-white/70">
              <li>
                <Link
                  className="hover:text-ink dark:hover:text-white transition-colors"
                  to="/license"
                >
                  License (MIT)
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-ink dark:hover:text-white transition-colors"
                  to="/privacy"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-ink dark:hover:text-white transition-colors"
                  to="/changelog"
                >
                  Changelog
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-ink/5 pt-6 text-sm text-ink/50 md:flex-row dark:border-white/10 dark:text-white/60">
          <p>© {new Date().getFullYear()} FLUXA. No pixels harmed.</p>
          <a
            href="https://github.com/ai-playground-arc-1"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-bold text-white hover:bg-ink/90 dark:bg-lime dark:text-neutral-950 dark:hover:bg-lime-bright transition-colors shadow-sm"
          >
            <Github className="h-4 w-4" /> Star on GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
