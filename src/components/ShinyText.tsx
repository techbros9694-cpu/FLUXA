import React from "react";
import "./ShinyText.css";

export interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
  color?: string;
  shineColor?: string;
  spread?: number;
  pauseOnHover?: boolean;
  direction?: "left" | "right";
  delay?: number;
  yoyo?: boolean;
}

export function ShinyText({
  text,
  disabled = false,
  speed = 2.5,
  className = "",
  color = "currentColor",
  shineColor = "#a3e635",
  spread = 120,
}: ShinyTextProps) {
  const gradientStyle: React.CSSProperties = {
    backgroundImage: `linear-gradient(${spread}deg, ${color} 0%, ${color} 35%, ${shineColor} 50%, ${color} 65%, ${color} 100%)`,
    backgroundSize: "200% auto",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    animationDuration: `${speed}s`,
  };

  return (
    <span
      className={`shiny-text ${disabled ? "shiny-text-disabled" : ""} ${className}`.trim()}
      style={gradientStyle}
    >
      {text}
    </span>
  );
}

export default ShinyText;
