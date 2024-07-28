"use client";

import React, { useEffect, useRef } from "react";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Boxes } from "@/components/ui/background-boxes";

import { isDesktop, isMobile, isTablet } from "react-device-detect";
import {
  useInView,
  m,
  useAnimation,
  LazyMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { SignedIn, SignedOut, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";
import { absoluteUrl } from "@/utils/utils";

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

  const request = () => {
    fetch(absoluteUrl("/api/drive"), { method: "POST" });
  };

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
          aria-label="Blogging Illustration"
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

            <SignedOut>
              <SignUpButton>
                <Button
                  size={"lg"}
                  className="bg-white text-black hover:bg-white/90"
                >
                  Become a Publisher
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link href={"/blogEditor"}>
                <Button
                  size={"lg"}
                  className="bg-white text-black hover:bg-white/90"
                >
                  Publish a Blog
                </Button>
              </Link>
            </SignedIn>
          </m.div>
        </LazyMotion>
      </div>
    </section>
  );
};

export const RevampedPublisherCTA = () => {
  const targetedRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetedRef,
    offset: ["start 0.85", "end 0.15"],
  });

  const overlayOpacity = useTransform(
    scrollYProgress,
    [0.55, 0.7, 1],
    [0.5, 0, 0]
  );

  const scale = useTransform(scrollYProgress, [0.7, 1], [1, 0.9]);

  const contentRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: contentYProgress } = useScroll({
    target: contentRef,
    offset: ["start 0.85", "end 0.15"],
  });

  const y = useTransform(contentYProgress, [0, 0.5, 1], [200, 0, -150]);

  return (
    <section
      ref={targetedRef}
      className="h-[180vh] w-full contain-paint relative overlay-image"
    >
      <LazyMotion features={loadFeatures} strict>
        <m.div
          ref={contentRef}
          style={{ y: y }}
          className="top-48 absolute w-full h-[120vh] flex justify-center items-center z-10 flex-col gap-6 pl-4"
        >
          <h2 className="text-6xl sm:text-7xl font-semibold text-[#F6F5AE] text-center font-brand">
            Your Stories Matter
          </h2>

          <p className="font-regular text-lg text-[#F6F5AE] text-center">
            Publish Blogs on Our Platform and Connect with Readers Worldwide!
          </p>

          <Button size={"lg"} className="rounded-3xl px-10 h-12">
            Become a Publisher
          </Button>
        </m.div>

        <m.div
          style={{ scale }}
          className="w-screen h-screen sticky bottom-0 top-0"
        >
          <m.div
            style={{ opacity: overlayOpacity }}
            className="absolute inset-0 bg-black z-10"
          />

          <Image
            fill
            priority
            src={"/book.jpg"}
            alt="Background Image"
            className="object-cover object-center"
          />
        </m.div>
      </LazyMotion>
    </section>
  );
};
