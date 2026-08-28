import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Heart, X } from "lucide-react";
import { fireHearts } from "@/lib/celebrate";

const reasons = [
  "The way you laugh — like you forget anyone else is watching. I never get tired of it.",
  "You make the most boring parts of my day feel like something I actually want to be in.",
  "I could be telling you the most pointless story and you actually listen. That means more than you know.",
  "You're the first person I want to talk to when something happens — good, bad, or completely stupid.",
  "You're soft and strong at the same time and I don't think you realise how rare that is.",
  "The way you care about people — quietly, without making a big deal of it — is one of my favourite things about you.",
  "You make me want to be more patient, more present, more everything. Not because you ask me to. Just because of who you are.",
  "Honestly? You're just really fun to be around. Like genuinely, actually fun. 😊",
  "You're the kind of person I'd choose again and again, even if I had every other option.",
  "Being liked by you feels like something I want to keep earning. Every single day.",
];

const jarHearts = Array.from({ length: 14 }, (_, i) => ({
  left: 8 + ((i * 29) % 76),
  bottom: 4 + ((i * 17) % 68),
  size: 10 + ((i * 13) % 12),
  pink: i % 2 === 0,
  delay: (i % 7) * 0.35,
}));

export function ReasonsJar() {
  const [reason, setReason] = useState<string | null>(null);
  const lastIndex = useRef(-1);

  const pick = useCallback(() => {
    let next = lastIndex.current;
    while (next === lastIndex.current) next = Math.floor(Math.random() * reasons.length);
    lastIndex.current = next;
    setReason(reasons[next] ?? null);
    fireHearts(0.45);
  }, []);

  return (
    <section className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-[0.7rem] tracking-[0.3em] text-blush uppercase">the reason jar</p>
        <h2 className="mt-4 text-3xl text-latte sm:text-5xl">Why I like you so much</h2>
        <p className="mx-auto mt-4 max-w-sm text-sm text-muted-foreground sm:text-base">
          I wrote these down so you'd actually believe me. Tap the jar.
        </p>

        <motion.button
          type="button"
          onClick={pick}
          whileHover={{ scale: 1.035, rotate: -1 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 320, damping: 18 }}
          aria-label="Open the reasons jar"
          className="group relative mx-auto mt-12 block h-64 w-52 cursor-pointer"
        >
          {/* lid */}
          <div className="mx-auto h-6 w-32 rounded-t-xl border-2 border-cocoa-light bg-rosegold shadow-soft" />
          <div className="mx-auto -mt-1 h-3 w-36 rounded-md border-2 border-cocoa-light bg-rosegold/80" />
          {/* jar body */}
          <div className="relative mx-auto mt-1 h-52 w-44 overflow-hidden rounded-b-[2.5rem] rounded-t-xl border-2 border-blush/60 bg-latte/10 backdrop-blur-[2px] transition-shadow group-hover:shadow-glow">
            <div className="absolute inset-y-0 left-3 w-3 rounded-full bg-latte/20" />
            {jarHearts.map((h, i) => (
              <Heart
                key={i}
                className={`absolute animate-drift ${h.pink ? "text-blush" : "text-cocoa-light"}`}
                style={{
                  left: `${h.left}%`,
                  bottom: `${h.bottom}%`,
                  width: h.size,
                  height: h.size,
                  fill: "currentColor",
                  animationDelay: `${h.delay}s`,
                  animationDuration: "6s",
                  willChange: "transform",
                }}
              />
            ))}
            <span className="absolute inset-x-0 top-4 text-center text-[0.6rem] tracking-[0.25em] text-latte/70 uppercase">
              tap me
            </span>
          </div>
        </motion.button>
      </div>

      <AnimatePresence>
        {reason && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              aria-label="Close"
              onClick={() => setReason(null)}
              className="absolute inset-0 bg-cocoa-deep/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="relative w-full max-w-md rounded-3xl border-2 border-blush bg-cocoa p-8 text-center shadow-glow"
            >
              <button
                onClick={() => setReason(null)}
                aria-label="Close reason"
                className="absolute top-4 right-4 rounded-full p-1.5 text-muted-foreground transition-colors hover:text-blush"
              >
                <X className="size-4" />
              </button>
              <Heart className="mx-auto size-8 text-blush" style={{ fill: "currentColor" }} />
              <p className="mt-5 font-display text-xl leading-relaxed text-latte italic sm:text-2xl">
                {reason}
              </p>
              <button
                onClick={pick}
                className="mt-7 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
              >
                show me another 🤎
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
