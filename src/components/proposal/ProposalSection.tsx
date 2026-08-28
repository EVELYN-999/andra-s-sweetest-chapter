import { useCallback, useState } from "react";
import { motion } from "motion/react";
import { Gem } from "lucide-react";
import { AmbientBackdrop } from "./AmbientBackdrop";

const noLabels = [
  "No 🙈",
  "No? 🙈",
  "Are you sure? 😳",
  "Think again 🥺",
  "Not an option 😭",
  "Try to catch me 🏃‍♀️",
  "Nope, wrong one 💔",
  "Andra, please 🫠",
  "This button is shy 🙈",
  "Just say yes 🤎",
];

export function ProposalSection({ onYes }: { onYes: () => void }) {
  const [dodges, setDodges] = useState(0);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const dodge = useCallback(() => {
    setDodges((d) => d + 1);
    setPos({
      x: (Math.random() - 0.5) * 2 * 38,
      y: (Math.random() - 0.5) * 2 * 34,
    });
  }, []);

  const yesScale = Math.min(1 + dodges * 0.16, 3.2);
  const noScale = Math.max(1 - dodges * 0.07, 0.42);
  const label = noLabels[Math.min(dodges, noLabels.length - 1)];

  return (
    <section className="surface-finale relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
      <AmbientBackdrop intense />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-2xl"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-blush/40 bg-cocoa-deep/50 px-4 py-1.5 text-[0.68rem] tracking-[0.28em] text-blush uppercase backdrop-blur-sm">
          <Gem className="size-3.5" />
          the real question
        </span>

        <h2 className="mt-8 text-3xl leading-[1.12] text-latte sm:text-5xl">
          Andra, will you make me the happiest person and{" "}
          <span className="text-romance italic">spend forever</span> with me? 💍
        </h2>

        {/* Fixed-height playground: keeps zero layout shift while the No button runs away */}
        <div className="relative mx-auto mt-14 h-64 w-full max-w-xl sm:h-56">
          <motion.button
            type="button"
            onClick={onYes}
            animate={{ scale: yesScale }}
            whileHover={{ scale: yesScale * 1.04 }}
            whileTap={{ scale: yesScale * 0.96 }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
            className="animate-soft-pulse absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary px-10 py-4 text-lg font-bold whitespace-nowrap text-primary-foreground shadow-glow"
          >
            YES! 🥰
          </motion.button>

          <motion.button
            type="button"
            onMouseEnter={dodge}
            onFocus={dodge}
            onClick={dodge}
            animate={{
              x: `${pos.x}vw`,
              y: `${pos.y}vh`,
              scale: noScale,
              opacity: Math.max(1 - dodges * 0.06, 0.35),
            }}
            transition={{ type: "spring", stiffness: 420, damping: 16 }}
            className="absolute bottom-2 left-1/2 z-10 -translate-x-1/2 rounded-full border border-border bg-cocoa/80 px-6 py-3 text-sm font-medium whitespace-nowrap text-muted-foreground backdrop-blur-sm"
          >
            {label}
          </motion.button>
        </div>

        <p className="mt-4 text-xs tracking-[0.18em] text-latte/60 uppercase">
          {dodges === 0
            ? "choose wisely 🤎"
            : dodges < 4
              ? "the no button seems... nervous"
              : "see? even the buttons agree"}
        </p>
      </motion.div>
    </section>
  );
}
