"use client";
import React, { useEffect, useRef } from "react";

import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { BsBook, BsNewspaper } from "react-icons/bs";
import { Notebook, Pen, Star, Text } from "lucide-react";
import { Boxes } from "@/components/ui/background-boxes";
import { motion, useAnimation, useInView } from "framer-motion";

import { useBreakpoint } from "use-breakpoint";

const FeatureCard = ({
  Icon,
  title,
  description,
  featureNumber,
}: {
  Icon: any;
  title: string;
  description: string;
  featureNumber: number;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "0px 0px -68px 0px", once: true });

  const initialVariants = {
    left: {
      left: "-100%",
      opacity: 0,
    },
    right: {
      right: "-100%",
      opacity: 0,
    },
    faded: {
      opacity: 0,
    },
  };

  const animateVariants = {
    slideFromLeft: {
      left: 0,
      opacity: 1,
    },
    slideFromRight: {
      right: 0,
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
    <motion.div
      ref={ref}
      initial={
        isFirstFeatureInRow
          ? initialVariants.left
          : isLastFeatureInRow
          ? initialVariants.right
          : initialVariants.faded
      }
      animate={controls}
      transition={{
        delay: isMiddleFeatureInRow ? 1 : 0,
        duration: isMiddleFeatureInRow ? 0.5 : 1,
        ease: "easeOut",
      }}
      variants={animateVariants}
      className="p-7 rounded-xl border border-zinc-200 flex flex-col gap-4 relative overflow-hidden group cursor-pointer"
    >
      <div className="pointer-events-none">
        <div className="absolute inset-0 rounded-2xl">
          <svg
            aria-hidden="true"
            className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/[0.02] stroke-black/5 dark:fill-white/1 dark:stroke-white/2.5"
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
              stroke-width="0"
              fill="url(#:Rkqpuja:)"
            ></rect>
            <svg x="50%" y="16" className="overflow-visible">
              <rect stroke-width="0" width="73" height="57" x="0" y="56"></rect>
              <rect
                stroke-width="0"
                width="73"
                height="57"
                x="72"
                y="168"
              ></rect>
            </svg>
          </svg>
        </div>

        <div
          className="absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay transition duration-300 group-hover:opacity-100"
          // style="mask-image: radial-gradient(300px at 433px 6px, white, transparent);"
        >
          <svg
            aria-hidden="true"
            className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/50 stroke-black/70 "
          >
            <defs>
              <pattern
                id=":R5kqpuja:"
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
              stroke-width="0"
              fill="url(#:R5kqpuja:)"
            ></rect>
            <svg x="50%" y="16" className="overflow-visible">
              <rect stroke-width="0" width="73" height="57" x="0" y="56"></rect>
              <rect
                stroke-width="0"
                width="73"
                height="57"
                x="72"
                y="168"
              ></rect>
            </svg>
          </svg>
        </div>
      </div>

      <div className=" pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 bg-gradient-to-r from-[#FFECD1]/10 via-[#FFECD1]/10 to-teal-200/10 z-20 transition-colors" />

      <Icon className="w-7 h-7 text-primary/70 z-20" />
      <p className="font-bold text-primary/90 text-lg mt-2 z-20">{title}</p>
      <p className="text-zinc-500 tracking-tight z-20">{description}</p>
    </motion.div>
  );
};

export const Features = () => {
  return (
    <MaxWidthWrapper className="flex flex-col gap-12 overflow-x-hidden px-6 xl:px-0">
      <h3 className="text-3xl font-semibold text-gray-800 text-center">
        Literature at Your Fingertips
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-7 sm:gap-y-10">
        <FeatureCard
          Icon={BsBook}
          featureNumber={1}
          title="Featured Books"
          description="Explore worlds within pages. Dive into our captivating collection of
            books today!"
        />

        <FeatureCard
          Icon={Star}
          featureNumber={2}
          title="Book Reviews"
          description="Explore worlds within pages. Dive into our captivating collection of
            books today!"
        />
        <FeatureCard
          Icon={Notebook}
          featureNumber={3}
          title="Featured Notes"
          description="Explore worlds within pages. Dive into our captivating collection of
            books today!"
        />
        <FeatureCard
          Icon={BsNewspaper}
          featureNumber={4}
          title="Featured Blogs"
          description="Explore worlds within pages. Dive into our captivating collection of
            books today!"
        />
        <FeatureCard
          Icon={Pen}
          featureNumber={5}
          title="Featured Articles"
          description="Explore worlds within pages. Dive into our captivating collection of
            books today!"
        />
        <FeatureCard
          Icon={Text}
          featureNumber={6}
          title="Featured Texts"
          description="Explore worlds within pages. Dive into our captivating collection of
            books today!"
        />
      </div>
    </MaxWidthWrapper>
  );
};
