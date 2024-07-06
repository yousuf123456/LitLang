"use client";
import React, { useEffect, useRef } from "react";

import useBreakpoint from "use-breakpoint";

import { LazyMotion, m, useAnimation, useInView } from "framer-motion";
const loadFeatures = () =>
  import("@/app/utils/features").then((res) => res.default);

export default function FeatureCard({
  Icon,
  title,
  iconLabel,
  description,
  featureNumber,
}: {
  Icon: any;
  title: string;
  iconLabel: string;
  description: string;
  featureNumber: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "0px 0px -68px 0px", once: true });

  const initialVariants = {
    left: {
      x: "-100%",
      opacity: 0,
    },
    right: {
      x: "100%",
      opacity: 0,
    },
    faded: {
      opacity: 0,
    },
  };

  const animateVariants = {
    slideFromLeft: {
      x: 0,
      opacity: 1,
    },
    slideFromRight: {
      x: 0,
      opacity: 1,
    },
    fadeIn: {
      opacity: 1,
    },
  };

  const { breakpoint } = useBreakpoint(
    { smallScreens: 0, largeScreens: 1024 },
    "smallScreens"
  );

  const isFirstFeatureInRow =
    breakpoint === "largeScreens"
      ? featureNumber === 1 || featureNumber === 4
      : featureNumber === 1 || featureNumber === 3 || featureNumber === 5;

  const isLastFeatureInRow =
    breakpoint === "largeScreens"
      ? featureNumber === 3 || featureNumber === 6
      : featureNumber === 2 || featureNumber === 4 || featureNumber === 6;

  const isMiddleFeatureInRow = !isFirstFeatureInRow && !isLastFeatureInRow;

  const controls = useAnimation();

  const compInitialVariant = isFirstFeatureInRow
    ? initialVariants.left
    : isLastFeatureInRow
    ? initialVariants.right
    : initialVariants.faded;

  useEffect(() => {
    if (inView) {
      if (isFirstFeatureInRow) {
        controls.start("slideFromLeft");
      } else if (isLastFeatureInRow) {
        controls.start("slideFromRight");
      } else controls.start("fadeIn");
    }
  }, [inView, controls]);

  return (
    <article>
      <LazyMotion strict features={loadFeatures}>
        <m.div
          ref={ref}
          initial={compInitialVariant}
          animate={controls}
          transition={{
            delay: isMiddleFeatureInRow ? 0.9 : 0,
            duration: isMiddleFeatureInRow ? 0.6 : 0.8,
            ease: "easeOut",
          }}
          variants={animateVariants}
          className="p-7 rounded-xl border border-zinc-200 flex flex-col gap-4 relative overflow-hidden group cursor-pointer"
        >
          <div className="pointer-events-none" aria-hidden>
            <div className="absolute inset-0 rounded-2xl">
              <svg
                aria-hidden="true"
                className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-zinc-50 stroke-zinc-100 dark:fill-white/1 dark:stroke-white/2.5"
              >
                <defs>
                  <pattern
                    id=":Rkqpuja:"
                    width="72"
                    height="56"
                    patternUnits="userSpaceOnUse"
                    x="50%"
                    y="16"
                  >
                    <path d="M.5 56V.5H72" fill="none"></path>
                  </pattern>
                </defs>
                <rect
                  width="100%"
                  height="100%"
                  strokeWidth="0"
                  fill="url(#:Rkqpuja:)"
                ></rect>
                <svg x="50%" y="16" className="overflow-visible">
                  <rect
                    strokeWidth="0"
                    width="73"
                    height="57"
                    x="0"
                    y="56"
                  ></rect>
                  <rect
                    strokeWidth="0"
                    width="73"
                    height="57"
                    x="72"
                    y="168"
                  ></rect>
                </svg>
              </svg>
            </div>
          </div>

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 bg-gradient-to-r from-brown-100/10 via-[#FFECD1]/10 to-brown-400/10 z-20 transition-colors"
          />

          <Icon
            className="w-7 h-7 text-primary/70 z-20"
            aria-label={iconLabel}
          />

          <p className="font-bold text-primary/90 text-lg mt-2 z-20">{title}</p>

          <p className="text-zinc-500 tracking-tight z-20">{description}</p>
        </m.div>
      </LazyMotion>
    </article>
  );
}
