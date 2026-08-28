import { motion } from "motion/react";
import { Mail, Sparkles } from "lucide-react";
import { AmbientBackdrop } from "./AmbientBackdrop";

export function HeroSection({ onOpen }: { onOpen: () => void }) {
  return (
    <section className="surface-romance relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 py-20 text-center">
      <AmbientBackdrop />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto max-w-2xl"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-cocoa/60 px-4 py-1.5 text-[0.7rem] tracking-[0.28em] text-blush uppercase backdrop-blur-sm">
          <Sparkles className="size-3.5" />
          just for you
        </span>

        <h1 className="mt-8 text-4xl leading-[1.08] font-medium tracking-tight text-latte sm:text-6xl">
          Hey my baby,{" "}
          <span className="text-romance italic">Andra</span> 🤎
        </h1>

        <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
          I made this for you. Every word here is genuine, and you deserve every single one of them.
        </p>

        <motion.button
          onClick={onOpen}
          whileHover={{ scale: 1.045 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 340, damping: 20 }}
          className="animate-soft-pulse mt-12 inline-flex items-center gap-3 rounded-full bg-primary px-9 py-4 text-base font-semibold text-primary-foreground shadow-glow"
        >
          <Mail className="size-5" />
          Open Your Letter 💌
        </motion.button>

        <p className="mt-10 text-xs tracking-[0.2em] text-muted-foreground/70 uppercase">
          take your time, Lessandra 🤎
        </p>
      </motion.div>
    </section>
  );
}
