import { useState, useEffect } from "react";
import OptionWheel from "./OptionWheel";

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
  const [selectedFormat, setSelectedFormat] = useState(FORMATS[0]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 py-12 sm:py-20 text-center">
      <h2 className="text-3xl font-black text-ink sm:text-5xl lg:text-6xl dark:text-white">
        Formats we vibe with
      </h2>
      <p className="mt-3 text-sm sm:text-lg text-ink/60 dark:text-white/70">
        Scroll, drag, or click the wheel to explore all supported media formats.
      </p>

      {/* Selected format indicator */}
      <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/80 dark:bg-surface/80 dark:border-white/10 px-4 sm:px-5 py-2 text-xs sm:text-base font-bold text-ink dark:text-white shadow-md backdrop-blur-md z-20 relative">
        <span className="text-ink/60 dark:text-white/60">Selected Format:</span>
        <span className="rounded-full bg-lime px-3 py-0.5 text-neutral-950 font-black shadow-sm">
          {selectedFormat}
        </span>
      </div>

      {/* OptionWheel Container - Frameless stage filling the section */}
      <div className="mt-8 relative w-full h-[360px] sm:h-[550px] overflow-hidden flex items-center justify-center">
        <OptionWheel
          items={FORMATS}
          defaultSelected={0}
          textColor="#a1a1aa"
          activeColor="#a3e635"
          side="left"
          fontSize={isMobile ? 2.2 : 3.5}
          spacing={isMobile ? 1.2 : 1.4}
          curve={isMobile ? 0.9 : 1.2}
          tilt={isMobile ? 4 : 7}
          blur={isMobile ? 1 : 2}
          fade={0.25}
          smoothing={200}
          inset={isMobile ? 24 : 120}
          loop={false}
          draggable={true}
          onChange={(_index, item) => setSelectedFormat(item)}
        />
      </div>
    </section>
  );
}
