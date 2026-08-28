import { Heart } from "lucide-react";

/** Deterministic pseudo-random so SSR and client markup match exactly. */
function seeded(i: number, salt = 1) {
  const x = Math.sin(i * 127.1 * salt + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

const r = (n: number) => Math.round(n * 100) / 100;

const hearts = Array.from({ length: 7 }, (_, i) => ({
  left: r(seeded(i + 1) * 96),
  top: r(seeded(i + 1, 2) * 92),
  size: r(14 + seeded(i + 1, 3) * 34),
  delay: r(seeded(i + 1, 4) * 8),
  duration: r(7 + seeded(i + 1, 5) * 8),
  opacity: r(0.12 + seeded(i + 1, 6) * 0.22),
}));

const sparkles = Array.from({ length: 16 }, (_, i) => ({
  left: r(seeded(i + 50) * 99),
  top: r(seeded(i + 50, 2) * 99),
  size: r(2 + seeded(i + 50, 3) * 4),
  delay: r(seeded(i + 50, 4) * 5),
}));

export function AmbientBackdrop({ intense = false }: { intense?: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {hearts.map((h, i) => (
        <Heart
          key={`h-${i}`}
          className="absolute animate-drift text-cocoa-light"
          style={{
            left: `${h.left}%`,
            top: `${h.top}%`,
            width: h.size,
            height: h.size,
            opacity: intense ? h.opacity + 0.15 : h.opacity,
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.duration}s`,
            fill: "currentColor",
            willChange: "transform",
            contain: "layout style",
          }}
        />
      ))}
      {sparkles.map((s, i) => (
        <span
          key={`s-${i}`}
          className="absolute animate-twinkle rounded-full bg-blush"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            willChange: "transform, opacity",
            contain: "layout style",
          }}
        />
      ))}
    </div>
  );
}
