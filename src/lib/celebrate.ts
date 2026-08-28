import confetti from "canvas-confetti";

const PINK = ["#FFB6C1", "#F8C8D8", "#FDFBF7"];
const COCOA = ["#3D2326", "#5C3A32", "#C08A63"];

/** Small heart-shaped burst, used for the reasons jar. */
export function fireHearts(scalar = 0.5) {
  const heart = confetti.shapeFromText({ text: "🤎", scalar: 2 });
  const pink = confetti.shapeFromText({ text: "💗", scalar: 2 });
  confetti({
    particleCount: 24,
    spread: 70,
    startVelocity: 32,
    scalar: 1.1,
    origin: { y: 0.55 },
    shapes: [heart, pink],
    colors: [...PINK, ...COCOA],
    disableForReducedMotion: true,
    ticks: 160 * (1 + scalar),
  });
}

/** Full celebration explosion for the YES moment. */
export function fireCelebration() {
  const heart = confetti.shapeFromText({ text: "🤎", scalar: 3 });
  const pink = confetti.shapeFromText({ text: "💖", scalar: 3 });

  confetti({
    particleCount: 160,
    spread: 100,
    origin: { y: 0.6 },
    colors: [...PINK, ...COCOA],
    disableForReducedMotion: true,
  });

  const end = Date.now() + 2600;
  const frame = () => {
    confetti({
      particleCount: 6,
      angle: 60,
      spread: 70,
      origin: { x: 0, y: 0.7 },
      shapes: [heart, pink],
      scalar: 1.4,
      colors: PINK,
      disableForReducedMotion: true,
    });
    confetti({
      particleCount: 6,
      angle: 120,
      spread: 70,
      origin: { x: 1, y: 0.7 },
      shapes: [heart, pink],
      scalar: 1.4,
      colors: COCOA,
      disableForReducedMotion: true,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  };
  frame();
}
