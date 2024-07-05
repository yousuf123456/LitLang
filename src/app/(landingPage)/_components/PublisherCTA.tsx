"use client";

import React, { useEffect, useRef } from "react";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Boxes } from "@/components/ui/background-boxes";

import { isDesktop, isMobile, isTablet } from "react-device-detect";
import { useInView, m, useAnimation, LazyMotion } from "framer-motion";

const loadFeatures = () =>
  import("@/app/utils/features").then((res) => res.default);

export const PublisherCTA = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -82px 0px" });

  const variants = {
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        delay: 0.3,
      },
    },
  };

  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("animate");
  }, [inView]);

  return (
    <section>
      <div className="section-content w-full relative px-3 sm:px-6 lg:px-12 py-16 md:py-24 bg-brown-800 overflow-hidden flex md:flex-row flex-col max-md:items-center md:justify-center gap-6 md:gap-12 lg:gap-24">
        {isDesktop && !isMobile && !isTablet && <Boxes />}
        {isDesktop && !isMobile && !isTablet && (
          <div
            aria-hidden
            className="absolute inset-0 w-full h-full bg-primary z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none"
          />
        )}

        <figure
          aria-hidden
          className="w-[220px] h-[216px] sm:w-[260px] sm:h-[226px] z-20 relative bg-brown-800/60 flex-shrink-0"
        >
          <Image alt="Illustration" src={"/blogging.svg"} fill />
        </figure>

        <LazyMotion strict features={loadFeatures}>
          <m.div
            ref={ref}
            initial={{
              y: 64,
              opacity: 0,
            }}
            animate={controls}
            variants={variants}
            className="relative flex flex-col justify-center gap-8 sm:gap-12 max-w-lg items-center z-20 bg-brown-800/60 rounded-2xl p-3"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-4xl leading-10 font-bold text-center text-white">
              Share Your Voice, Publish Your Own Blog Today!
            </h2>

            <div>
              <Button
                size={"lg"}
                className="bg-white text-black hover:bg-white/90"
              >
                Become a Publisher
              </Button>
            </div>
          </m.div>
        </LazyMotion>
      </div>
    </section>
  );
};
