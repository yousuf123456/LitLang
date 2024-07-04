"use client";

import { m, LazyMotion } from "framer-motion";
const loadFeatures = () =>
  import("@/app/utils/features").then((res) => res.default);

const banner = {
  animate: {
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.02,
    },
  },
};

const letterAni = {
  initial: { left: -48, opacity: 0 },
  animate: {
    left: 0,
    opacity: 1,
    transition: {
      ease: "easeInOut",
      duration: 0.35,
    },
  },
};

export const AnimatedLetters = ({ text }: { text: string }) => (
  <LazyMotion features={loadFeatures} strict>
    <m.span
      variants={banner}
      initial="initial"
      animate="animate"
      className="row-title"
    >
      {text.split("").map((letter) => (
        <m.span className="relative" variants={letterAni}>
          {letter}
        </m.span>
      ))}
    </m.span>
  </LazyMotion>
);
