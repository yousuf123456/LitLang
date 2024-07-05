"use client";
import React, { useEffect, useRef } from "react";

import { cn } from "@/utils/utils";
import { Verified, X } from "lucide-react";

import { m, LazyMotion, useInView, useAnimation } from "framer-motion";

const loadFeatures = () =>
  import("@/app/utils/features").then((res) => res.default);

export const PricingPlanFeatures = () => {
  const features = [
    {
      text: "Easily accessible notes.",
      availability: {
        standard: true,
        premium: true,
      },
    },
    {
      text: "Study materials for Universities.",
      availability: {
        standard: true,
        premium: true,
      },
    },
    {
      text: "Chance to publish your literary ideas.",
      availability: {
        standard: true,
        premium: true,
      },
    },
    {
      text: "Premium handwritten notes.",
      availability: {
        standard: false,
        premium: true,
      },
    },
    {
      text: "Voice explanation of required topics.",
      availability: {
        standard: false,
        premium: true,
      },
    },
    {
      text: "Assistance in Assignments",
      availability: {
        standard: false,
        premium: true,
      },
    },
    {
      text: "Assistance in Presentations.",
      availability: {
        standard: false,
        premium: true,
      },
    },
    {
      text: "Help from professional tutors.",
      availability: {
        standard: false,
        premium: true,
      },
    },
  ];

  const variants = {
    animate: ({ i, isIcon }: { i: number; isIcon: boolean }) =>
      !isIcon
        ? {
            y: 0,
            opacity: 1,
            transition: {
              delay: i * 0.7,
              duration: 0.4,
              ease: "easeInOut",
            },
          }
        : {
            opacity: 1,
            transition: {
              delay: i * 0.7 + 0.6,
            },
          },
  };

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -64px 0px" });

  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("animate");
  }, [inView, controls]);

  return (
    <div
      ref={ref}
      className="border border-zinc-400 grid grid-cols-1 sm:grid-cols-2 auto-rows-[3.5rem] rounded-lg"
    >
      <LazyMotion features={loadFeatures}>
        {features.map((feature, i) => (
          <div
            key={i}
            className={cn(
              "border-b border-b-zinc-400 flex gap-6 justify-between items-center px-4 py-2",
              i === features.length - 1 && "border-b-0",
              features.length % 2 === 0 && i === features.length - 2
                ? "sm:border-b-0"
                : i === features.length - 1 && "sm:border-b-0"
            )}
          >
            <m.p
              animate={controls}
              variants={variants}
              custom={{ i, isIcon: false }}
              initial={{ opacity: 0, y: 36 }}
              className="text-zinc-700 text-sm"
            >
              {feature.text}
            </m.p>

            <m.span
              animate={controls}
              variants={variants}
              initial={{ opacity: 0 }}
              custom={{ i, isIcon: true }}
            >
              {feature.availability.premium ? (
                <Verified className="w-6 h-6 fill-gray-900 text-white flex-shrink-0" />
              ) : (
                <X className="text-red-400 w-5 h-5 flex-shrink-0" />
              )}
            </m.span>
          </div>
        ))}
      </LazyMotion>
    </div>
  );
};
