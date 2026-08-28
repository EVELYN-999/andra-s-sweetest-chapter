import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { CalendarHeart, Heart, Music4, X } from "lucide-react";

function useTogetherClock() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export function CelebrationOverlay({ onClose }: { onClose: () => void }) {
  const now = useTogetherClock();
  const start = new Date("2026-08-28T00:00:00Z").getTime();
  const seconds = Math.max(0, Math.floor((now - start) / 1000));
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="surface-finale fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto px-6 py-16 text-center"
    >
      <button
        onClick={onClose}
        aria-label="Close celebration"
        className="absolute top-5 right-5 rounded-full border border-border bg-cocoa/70 p-2 text-latte/70 transition-colors hover:text-blush"
      >
        <X className="size-4" />
      </button>

      <motion.div
        initial={{ scale: 0.9, y: 24, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
        className="w-full max-w-lg"
      >
        <motion.div
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="mx-auto flex size-20 items-center justify-center rounded-full bg-primary shadow-glow"
        >
          <Heart className="size-9 text-primary-foreground" style={{ fill: "currentColor" }} />
        </motion.div>

        <h2 className="mt-8 text-4xl leading-tight text-latte sm:text-6xl">
          SHE SAID <span className="text-romance italic">YES!</span>
        </h2>
        <p className="mt-4 text-base text-latte/80 sm:text-lg">Best day ever. 🤎✨</p>

        <div className="mt-10 rounded-3xl border-2 border-blush/50 bg-cocoa-deep/60 p-6 backdrop-blur-sm">
          <p className="inline-flex items-center gap-2 text-[0.65rem] tracking-[0.26em] text-blush uppercase">
            <CalendarHeart className="size-3.5" />
            forever, counting from today
          </p>
          <div className="mt-5 grid grid-cols-4 gap-2">
            {[
              { v: d, l: "days" },
              { v: h, l: "hrs" },
              { v: m, l: "min" },
              { v: s, l: "sec" },
            ].map((unit) => (
              <div key={unit.l} className="rounded-2xl bg-cocoa/70 py-3">
                <p className="font-display text-2xl text-latte tabular-nums sm:text-3xl">
                  {unit.v}
                </p>
                <p className="mt-1 text-[0.6rem] tracking-[0.2em] text-muted-foreground uppercase">
                  {unit.l}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 font-display text-lg leading-relaxed text-latte/90 italic">
            “Andra, you just made a whole future start. Dinner is on me — same place, our song
            playing.”
          </p>
          <p className="mt-4 inline-flex items-center gap-2 text-xs text-muted-foreground">
            <Music4 className="size-3.5" />
            our song, on repeat
          </p>
        </div>

        <button
          onClick={onClose}
          className="mt-8 rounded-full border border-blush/50 px-7 py-3 text-sm font-semibold text-latte transition-colors hover:bg-blush hover:text-cocoa-deep"
        >
          Read it all again 💌
        </button>
      </motion.div>
    </motion.div>
  );
}
