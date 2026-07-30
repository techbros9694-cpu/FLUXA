import { Github, ShieldCheck, Users, Sparkles } from "lucide-react";

export function WhoWeAre() {
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
      {/* Header & Vision Box */}
      <div className="mx-auto max-w-4xl rounded-3xl border border-ink/10 bg-white p-6 sm:p-10 text-center shadow-float backdrop-blur-md dark:bg-surface dark:border-white/10">
        <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-ink/80 shadow-float dark:bg-surface-2 dark:text-white/90 dark:border-white/10">
          <Sparkles className="h-3.5 w-3.5 text-lime-bright" />
          Who We Are
        </span>
        <h2 className="mt-4 text-3xl font-black text-ink sm:text-5xl dark:text-white leading-tight">
          Building{" "}
          <span className="inline-block rounded-2xl bg-lime px-3.5 py-1 text-neutral-950 font-black shadow-sm">
            FLUXA
          </span>{" "}
          for Everyone
        </h2>
        <div className="mt-6 space-y-4 text-base sm:text-lg font-medium text-ink/80 leading-relaxed dark:text-white/90">
          <p>
            FLUXA was created with a simple vision: powerful file tools should be fast, beautiful,
            private, and accessible to everyone.
          </p>
          <p>
            We are building FLUXA as a browser-first, open-source workspace that helps people
            convert, organize, and work with files without unnecessary complexity or privacy
            concerns.
          </p>
          <p>
            Our mission is to create a modern platform that students, professionals, developers,
            creators, and everyday users can trust for reliable file tools that run directly in the
            browser.
          </p>
          <p>
            We believe great software should be simple, elegant, privacy-first, and available to
            everyone.
          </p>
        </div>

        {/* Mission Statement Box */}
        <div className="mt-8 rounded-2xl border border-ink/10 bg-lime/10 p-5 sm:p-8 text-center shadow-float dark:bg-lime/20 dark:border-lime/30">
          <span className="text-xs font-black uppercase tracking-wider text-ink/70 dark:text-lime-bright">
            Mission Statement
          </span>
          <blockquote className="mt-2 text-base sm:text-xl font-extrabold text-ink dark:text-white italic leading-snug">
            &ldquo;Build beautiful, privacy-first, browser-based file tools that are free, open
            source, and accessible to everyone.&rdquo;
          </blockquote>
        </div>
      </div>

      {/* Meet the Founders */}
      <div className="mt-16 sm:mt-20">
        <div className="text-center">
          <h3 className="text-2xl sm:text-4xl font-black text-ink dark:text-white">
            Meet the Founders
          </h3>
          <p className="mt-2 text-sm sm:text-base font-semibold text-ink/70 dark:text-white/70">
            The minds and craft behind FLUXA
          </p>
        </div>

        <div className="mt-8 sm:mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2">
          {/* Pritam Halmadage Card */}
          <div className="group relative flex flex-col justify-between rounded-3xl border border-ink/10 bg-white p-6 shadow-float transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-surface dark:border-white/10">
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-lime px-3 py-1 text-xs font-black uppercase text-neutral-950">
                  Founder & Developer
                </span>
                <a
                  href="https://github.com/pritam3606"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full p-1.5 text-ink/70 hover:bg-black/5 hover:text-ink dark:text-white/80 dark:hover:bg-white/10 dark:hover:text-white transition-colors"
                  aria-label="Pritam Halmadage GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
              </div>
              <h4 className="mt-4 text-xl sm:text-2xl font-black text-ink dark:text-white">
                Pritam Halmadage
              </h4>
              <p className="mt-3 text-sm font-medium text-ink/80 leading-relaxed dark:text-white/80">
                Passionate about building modern, privacy-first web applications and creating
                high-quality open-source software.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-ink/10 dark:border-white/10">
              <a
                href="https://github.com/pritam3606"
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs sm:text-sm font-extrabold text-white hover:bg-ink/90 dark:bg-lime dark:text-neutral-950 dark:hover:bg-lime-bright transition-colors shadow-sm"
              >
                <Github className="h-4 w-4" />
                <span>GitHub Profile</span>
              </a>
            </div>
          </div>

          {/* Piyush Satpute Card */}
          <div className="group relative flex flex-col justify-between rounded-3xl border border-ink/10 bg-white p-6 shadow-float transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-surface dark:border-white/10">
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-sunny px-3 py-1 text-xs font-black uppercase text-neutral-950">
                  Founder & Developer
                </span>
                <a
                  href="https://github.com/Pcreates97"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full p-1.5 text-ink/70 hover:bg-black/5 hover:text-ink dark:text-white/80 dark:hover:bg-white/10 dark:hover:text-white transition-colors"
                  aria-label="Piyush Satpute GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
              </div>
              <h4 className="mt-4 text-xl sm:text-2xl font-black text-ink dark:text-white">
                Piyush Satpute
              </h4>
              <p className="mt-3 text-sm font-medium text-ink/80 leading-relaxed dark:text-white/80">
                Focused on designing, building, and improving innovative open-source software
                experiences with clean and user-friendly interfaces.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-ink/10 dark:border-white/10">
              <a
                href="https://github.com/Pcreates97"
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs sm:text-sm font-extrabold text-white hover:bg-ink/90 dark:bg-lime dark:text-neutral-950 dark:hover:bg-lime-bright transition-colors shadow-sm"
              >
                <Github className="h-4 w-4" />
                <span>GitHub Profile</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Our Organization */}
      <div className="mt-14 sm:mt-16">
        <div className="rounded-3xl border border-ink/10 bg-white p-6 sm:p-10 shadow-float backdrop-blur-md dark:bg-surface dark:border-white/10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-lime/20 border border-lime/40 px-3 py-1 text-xs font-bold text-neutral-950 dark:text-lime-bright dark:bg-lime/20">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Open Source
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-sunny/20 border border-sunny/40 px-3 py-1 text-xs font-bold text-neutral-950 dark:text-sunny dark:bg-sunny/20">
                  <Users className="h-3.5 w-3.5" />
                  Community Driven
                </span>
              </div>
              <h3 className="mt-4 text-2xl sm:text-3xl font-black text-ink dark:text-white">
                AI Playground ARC
              </h3>
              <p className="mt-3 text-sm sm:text-base font-medium text-ink/80 leading-relaxed dark:text-white/90">
                FLUXA is proudly developed under{" "}
                <strong className="text-ink dark:text-white font-black">AI Playground ARC</strong>,
                an open-source organization dedicated to building modern, high-quality,
                privacy-first software for everyone.
              </p>
              <p className="mt-2 text-sm font-medium text-ink/75 leading-relaxed dark:text-white/80">
                Our goal is to create useful tools that are accessible, community-driven, and built
                with long-term quality in mind.
              </p>
            </div>

            <div className="shrink-0 w-full md:w-auto">
              <a
                href="https://github.com/ai-playground-arc-1"
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full md:w-auto items-center justify-center gap-2 rounded-2xl bg-lime px-6 py-3.5 text-sm font-extrabold text-neutral-950 hover:bg-lime-bright transition-colors shadow-float"
              >
                <Github className="h-5 w-5" />
                <span>GitHub Organization</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
