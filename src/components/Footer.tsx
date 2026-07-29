import { Github, Heart, Coffee } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-ink/5 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 text-xl font-black text-ink">
              <span>🎬</span> VideoMorph
            </div>
            <p className="mt-3 text-sm text-ink/60 max-w-xs">
              Made with <Heart className="inline h-4 w-4 fill-lime-bright text-lime-bright" /> and
              powered by <Coffee className="inline h-4 w-4" /> + open source.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-black uppercase tracking-wider text-ink">Community</h4>
            <ul className="mt-3 space-y-2 text-sm text-ink/60">
              <li>
                <a className="hover:text-ink" href="#">
                  GitHub (placeholder)
                </a>
              </li>
              <li>
                <a className="hover:text-ink" href="#">
                  Discord
                </a>
              </li>
              <li>
                <a className="hover:text-ink" href="#">
                  Contribute
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-black uppercase tracking-wider text-ink">Boring stuff</h4>
            <ul className="mt-3 space-y-2 text-sm text-ink/60">
              <li>
                <a className="hover:text-ink" href="#">
                  License (MIT)
                </a>
              </li>
              <li>
                <a className="hover:text-ink" href="#">
                  Privacy
                </a>
              </li>
              <li>
                <a className="hover:text-ink" href="#">
                  Changelog
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-ink/5 pt-6 text-sm text-ink/50 md:flex-row">
          <p>© {new Date().getFullYear()} VideoMorph. No pixels harmed.</p>
          <a href="#" className="flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-white">
            <Github className="h-4 w-4" /> Star on GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
