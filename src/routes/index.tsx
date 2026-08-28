import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { HeroSection } from "@/components/proposal/HeroSection";
import { MemoryLane } from "@/components/proposal/MemoryLane";
import { ReasonsJar } from "@/components/proposal/ReasonsJar";
import { ProposalSection } from "@/components/proposal/ProposalSection";
import { CelebrationOverlay } from "@/components/proposal/CelebrationOverlay";
import { fireCelebration } from "@/lib/celebrate";

const title = "For Andra 🤎 A Letter, A Jar, A Question";
const description =
  "A little corner of the internet just for Andra: memory chapters, a jar of reasons, and one very important question.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [opened, setOpened] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const storyRef = useRef<HTMLDivElement>(null);

  const openLetter = useCallback(() => {
    setOpened(true);
    requestAnimationFrame(() => {
      storyRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  const sayYes = useCallback(() => {
    setCelebrating(true);
    fireCelebration();
  }, []);

  return (
    <main className="surface-romance relative min-h-[100svh] overflow-x-hidden">
      <HeroSection onOpen={openLetter} />

      <AnimatePresence initial={false}>
        {opened && (
          <motion.div
            ref={storyRef}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <MemoryLane />
            <ReasonsJar />
            <ProposalSection onYes={sayYes} />
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="relative z-10 px-6 pb-12 text-center text-xs tracking-[0.2em] text-muted-foreground/70 uppercase">
        made with far too much love, for Lessandra
      </footer>

      <AnimatePresence>
        {celebrating && <CelebrationOverlay onClose={() => setCelebrating(false)} />}
      </AnimatePresence>
    </main>
  );
}
