import { useEffect, useState } from "react";

const EMOJIS = ["✨", "🎬", "😂", "🍿", "💾", "🚀", "📹", "📼"];

type Sticker = { id: string; emoji: string; left: number; duration: number; size: number };

export function Stickers() {
  const [items, setItems] = useState<Sticker[]>([]);
  useEffect(() => {
    let count = 0;
    const spawn = () => {
      const s: Sticker = {
        id: `sticker-${Date.now()}-${Math.random().toString(36).substring(2, 7)}-${count++}`,
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        left: Math.random() * 100,
        duration: 8 + Math.random() * 6,
        size: 22 + Math.random() * 28,
      };
      setItems((cur) => [...cur, s]);
      setTimeout(() => setItems((cur) => cur.filter((x) => x.id !== s.id)), s.duration * 1000);
    };
    const t = setInterval(spawn, 2200);
    spawn();
    return () => clearInterval(t);
  }, []);
  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
      {items.map((s) => (
        <span
          key={s.id}
          className="absolute select-none"
          style={{
            left: `${s.left}%`,
            bottom: "-60px",
            fontSize: `${s.size}px`,
            animation: `vm-sticker ${s.duration}s linear forwards`,
          }}
        >
          {s.emoji}
        </span>
      ))}
      <style>{`@keyframes vm-sticker { 0% { transform: translateY(0) rotate(0deg); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { transform: translateY(-110vh) rotate(360deg); opacity: 0; } }`}</style>
    </div>
  );
}
