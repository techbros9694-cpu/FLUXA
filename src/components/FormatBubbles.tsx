const FORMATS = [
  "MP4",
  "MOV",
  "AVI",
  "MKV",
  "FLV",
  "WEBM",
  "WMV",
  "GIF",
  "3GP",
  "MPEG",
  "OGV",
  "M4V",
];

export function FormatBubbles() {
  return (
    <section className="relative z-10 mx-auto max-w-5xl px-6 py-16 text-center">
      <h2 className="text-4xl font-black text-ink sm:text-5xl">Formats we vibe with</h2>
      <p className="mt-3 text-ink/60">Hover them. They love it.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {FORMATS.map((f, i) => (
          <span
            key={f}
            className="cursor-default select-none rounded-full border border-ink/10 px-5 py-2.5 text-sm font-black text-ink shadow-float transition-transform hover:scale-125 hover:rotate-3"
            style={{
              background: i % 3 === 0 ? "var(--lime)" : i % 3 === 1 ? "var(--sunny)" : "white",
            }}
          >
            {f}
          </span>
        ))}
      </div>
    </section>
  );
}
