import React from "react";

interface FluxaLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  textClassName?: string;
}

export function FluxaLogo({
  className = "",
  size = 32,
  showText = false,
  textClassName = "",
}: FluxaLogoProps) {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-sm transition-transform hover:scale-105"
      >
        <defs>
          <linearGradient
            id="purpleRibbon"
            x1="120"
            y1="80"
            x2="380"
            y2="180"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="50%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#D946EF" />
          </linearGradient>

          <linearGradient
            id="blueRibbon"
            x1="140"
            y1="180"
            x2="350"
            y2="280"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#1E40AF" />
            <stop offset="50%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>

          <linearGradient
            id="cyanRibbon"
            x1="130"
            y1="260"
            x2="280"
            y2="380"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="50%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>
        </defs>

        {/* Top Curve of F */}
        <path
          d="M 175 220 C 160 140, 200 80, 360 80 C 375 80, 385 92, 375 105 C 350 135, 270 145, 220 150 C 250 150, 330 145, 350 145 C 365 145, 370 160, 355 170 C 310 200, 240 215, 175 220 Z"
          fill="url(#purpleRibbon)"
        />

        {/* Middle Bar of F */}
        <path
          d="M 150 290 C 140 210, 180 160, 340 160 C 352 160, 358 172, 348 182 C 300 220, 240 225, 185 235 C 220 235, 300 228, 320 228 C 335 228, 340 242, 325 252 C 275 285, 200 290, 150 290 Z"
          fill="url(#blueRibbon)"
        />

        {/* Base Sweep of F */}
        <path
          d="M 135 300 C 130 240, 155 180, 200 130 C 180 200, 140 280, 150 340 C 158 390, 200 405, 220 380 C 235 360, 230 330, 200 320 C 170 310, 140 320, 135 300 Z"
          fill="url(#cyanRibbon)"
        />
      </svg>

      {showText && (
        <span
          className={`font-black tracking-tight uppercase text-ink dark:text-white ${textClassName}`}
        >
          FLUEXA
        </span>
      )}
    </div>
  );
}
