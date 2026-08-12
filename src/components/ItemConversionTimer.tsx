import { useState, useEffect } from "react";
import { BatchItem } from "@/types/converter";

function formatTimerClock(seconds: number | undefined, includeHundredths = true): string {
  if (seconds === undefined || isNaN(seconds) || seconds < 0) {
    return includeHundredths ? "00:00.00" : "00:00";
  }
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  const mStr = m < 10 ? `0${m}` : `${m}`;
  const sStr = s < 10 ? `0${s}` : `${s}`;

  if (includeHundredths) {
    const hundredths = Math.floor((seconds % 1) * 100);
    const hStr = hundredths < 10 ? `0${hundredths}` : `${hundredths}`;
    return `${mStr}:${sStr}.${hStr}`;
  }
  return `${mStr}:${sStr}`;
}

export function ItemConversionTimer({
  startTime,
  endTime,
  conversionTimeSeconds,
  status,
  includeHundredths = true,
  className = "",
  prefix = "⏱ ",
}: {
  startTime?: number;
  endTime?: number;
  conversionTimeSeconds?: number;
  status: BatchItem["status"];
  includeHundredths?: boolean;
  className?: string;
  prefix?: string;
}) {
  const [elapsed, setElapsed] = useState<number>(() => {
    if (conversionTimeSeconds !== undefined) return conversionTimeSeconds;
    if (endTime && startTime) return (endTime - startTime) / 1000;
    if (startTime) return (performance.now() - startTime) / 1000;
    return 0;
  });

  useEffect(() => {
    if (status !== "converting" || !startTime) {
      if (conversionTimeSeconds !== undefined) {
        setElapsed(conversionTimeSeconds);
      } else if (endTime && startTime) {
        setElapsed((endTime - startTime) / 1000);
      }
      return;
    }

    let animationFrameId: number;

    const tick = () => {
      const now = performance.now();
      setElapsed((now - startTime) / 1000);
      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [status, startTime, endTime, conversionTimeSeconds]);

  if (status === "waiting") {
    return null;
  }

  return (
    <span className={`font-mono font-bold ${className}`}>
      {prefix}
      {formatTimerClock(elapsed, includeHundredths)}
    </span>
  );
}
