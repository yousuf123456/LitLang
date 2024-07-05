"use client";

import { m, LazyMotion } from "framer-motion";
const loadFeatures = () =>
  import("@/app/utils/features").then((res) => res.default);

export const AnimatedHeading = ({ text }: { text: string }) => {
  return (
    <LazyMotion strict features={loadFeatures}>
      <m.h1
        initial={{ y: 80, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          transition: { type: "spring", stiffness: 100, delay: 0.35 },
        }}
        className="text-3xl min-[420px]:text-4xl md:text-5xl lg:text-6xl font-bold text-center font-primary max-w-lg md:max-w-3xl lg:max-w-4xl capitalize text-gray-800"
      >
        {text}
      </m.h1>
    </LazyMotion>
  );
};
