"use client";

import { m, LazyMotion } from "framer-motion";
const loadFeatures = () =>
  import("@/app/utils/features").then((res) => res.default);

const letterAni = {
  initial: { left: -16, opacity: 0 },
  animate: {
    left: 0,
    opacity: 1,
    transition: {
      ease: "easeInOut",
      duration: 0.5,
    },
  },
};

export const AnimatedLetters = ({
  text,
  delayChildren,
}: {
  text: string;
  delayChildren?: number;
}) => (
  <LazyMotion features={loadFeatures}>
    <m.span
      variants={{
        animate: {
          transition: {
            delayChildren: delayChildren || 0.1,
            staggerChildren: 0.02,
          },
        },
      }}
      initial="initial"
      animate="animate"
      className="row-title"
    >
      {text.split("").map((letter, i) => (
        <m.span key={i} className="relative" variants={letterAni}>
          {letter}
        </m.span>
      ))}
    </m.span>
  </LazyMotion>
);
