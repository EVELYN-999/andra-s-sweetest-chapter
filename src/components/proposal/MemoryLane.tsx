import { useState } from "react";
import { motion } from "motion/react";
import { Coffee, Moon, Music, Sun, type LucideIcon } from "lucide-react";

type Chapter = {
  icon: LucideIcon;
  chapter: string;
  title: string;
  hint: string;
  secret: string;
};

const chapters: Chapter[] = [
  {
    icon: Sun,
    chapter: "Chapter One",
    title: "The first hello",
    hint: "Tap to reveal secret",
    secret:
      "I replayed that first conversation in my head all night. I already knew you were going to matter more than you should this early.",
  },
  {
    icon: Coffee,
    chapter: "Chapter Two",
    title: "Slow mornings & sweet talk",
    hint: "Tap to reveal secret",
    secret:
      "Chocolate and mornings became my favourite things because they taste like the version of me that gets to talk to you.",
  },
  {
    icon: Music,
    chapter: "Chapter Three",
    title: "That song, our song",
    hint: "Tap to reveal secret",
    secret:
      "Every time it plays somewhere random, I smile like an idiot in public. You've ruined music for me in the best way.",
  },
  {
    icon: Moon,
    chapter: "Chapter Four",
    title: "Late nights, no goodbyes",
    hint: "Tap to reveal secret",
    secret:
      "3am with you feels safer than noon with anyone else. That's when I stopped calling this a crush, Andra.",
  },
];

function ChapterCard({ item, index }: { item: Chapter; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const Icon = item.icon;

  return (
    <motion.button
      type="button"
      onClick={() => setFlipped((f) => !f)}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      aria-pressed={flipped}
      className="card-3d group relative h-72 w-full min-w-[16rem] snap-center text-left [perspective:1200px] sm:min-w-0"
    >
      <motion.div
        className="card-3d relative h-full w-full"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Front */}
        <div className="backface-hidden absolute inset-0 flex flex-col justify-between rounded-3xl border-2 border-cocoa-light bg-blush-soft p-6 shadow-soft transition-shadow group-hover:shadow-glow">
          <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-cocoa text-blush">
            <Icon className="size-5" />
          </span>
          <div>
            <p className="text-[0.65rem] tracking-[0.24em] text-cocoa/60 uppercase">
              {item.chapter}
            </p>
            <h3 className="mt-2 text-2xl leading-snug text-cocoa-deep">{item.title}</h3>
            <p className="mt-4 text-xs tracking-[0.16em] text-cocoa/70 uppercase">
              {item.hint}
            </p>
          </div>
        </div>

        {/* Back */}
        <div
          className="backface-hidden absolute inset-0 flex flex-col justify-center rounded-3xl border-2 border-blush bg-cocoa p-6 shadow-glow"
          style={{ transform: "rotateY(180deg)" }}
        >
          <p className="text-[0.65rem] tracking-[0.24em] text-blush uppercase">
            a little secret
          </p>
          <p className="mt-3 font-display text-lg leading-relaxed text-latte italic">
            “{item.secret}”
          </p>
        </div>
      </motion.div>
    </motion.button>
  );
}

export function MemoryLane() {
  return (
    <section className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-[0.7rem] tracking-[0.3em] text-blush uppercase">memory lane</p>
          <h2 className="mt-4 text-3xl text-latte sm:text-5xl">Our Story, in little chapters</h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground sm:text-base">
            Four cards, four soft truths. Tap each one — they're hiding something.
          </p>
        </div>

        <div className="mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4">
          {chapters.map((c, i) => (
            <ChapterCard key={c.title} item={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
