"use client";

import React, { useEffect, useRef, useState } from "react";

import ShimmerButton from "@/components/magicui/shimmer-button";
import Image from "next/image";

import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { SignedIn, SignedOut, SignUpButton } from "@clerk/nextjs";
import { AnimatedHeading } from "./AnimatedHeading";
import Link from "next/link";

import {
  easeIn,
  LazyMotion,
  m,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";

import Lenis from "lenis";

import { FlipWords } from "@/components/ui/flip-words";
import { Navbar } from "./Navbar";
import { HeroImage } from "./HeroImage";
import WordPullUp from "@/components/magicui/word-pull-up";
import BlurFade from "@/components/magicui/blur-fade";
const loadFeatures = () =>
  import("@/app/utils/features").then((res) => res.default);

export const Hero = () => {
  return (
    <section className="w-full h-full bg-grid-black/[0.1] relative pb-16">
      <div
        aria-hidden
        className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_60%,black)]"
      ></div>

      <MaxWidthWrapper className="mt-4 pt-12 lg:pt-20 px-5 z-50">
        <div className="flex flex-col gap-3 w-full items-center">
          <AnimatedHeading text="Your Gateway to Literature and Linguistic Excellence" />

          <p className="mt-3 text-zinc-900 text-sm md:text-base lg:text-lg max-w-3xl font-primary font-medium text-center">
            Discover, Learn, and Excel with Our Educational Notes.
          </p>

          <div className="w-[196px] h-[44px]">
            <SignedOut>
              <SignUpButton>
                <Button size={"lg"} className="mt-4 bg-brown-800">
                  Become a Publisher
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link href="/blogEditor">
                <Button size={"lg"} className="mt-4 bg-brown-800">
                  Publish a Blog
                </Button>
              </Link>
            </SignedIn>
          </div>
        </div>
      </MaxWidthWrapper>

      <div className="relative isolate z-10 mt-8 sm:mt-12">
        <div
          aria-hidden
          className="w-full max-w-xs md:max-w-md lg:max-w-2xl pointer-events-none h-[320px] md:h-[448px] lg:h-[672px] bg-primary rounded-full blur-3xl opacity-5 -translate-y-[30%] -z-50 absolute left-6 top-0"
        />

        <div className="max-w-5xl w-full mx-auto px-4 sm:px-8">
          <div className=" bg-gray-400/10 rounded-lg border-[1px] border-slate-950/5 relative w-full aspect-w-16 aspect-h-10 h-auto">
            <Image
              fill
              priority
              src={"/dashboard-preview.jpg"}
              alt="Dashboard Preview Picture"
              className="object-cover object-center rounded-lg border-[1px] border-gray-900/10 shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export const RevampedHero = () => {
  const variants = {
    initial: {
      y: 160,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <LazyMotion features={loadFeatures} strict>
      <section className="w-full h-full pb-16 bg-themeSecondary relative overflow-hidden">
        <MaxWidthWrapper className="mt-4 pt-12 lg:pt-20 px-5 z-50">
          <m.div
            variants={variants}
            animate="animate"
            initial="initial"
            transition={{
              delay: 0.4,
              duration: 0.7,
              ease: "easeInOut",
            }}
            className="flex flex-col gap-8 items-center"
          >
            <div className="flex flex-col w-full items-center">
              <h1 className="text-9xl font-extrabold text-black text-center">
                Discover Literary
              </h1>

              <h1 className="text-9xl font-extrabold text-black">
                <FlipWords
                  words={["Treasures", "Wonders", "Secrets", "Wisdom"]}
                />
              </h1>
            </div>

            <div className="w-[196px] h-[44px]">
              <SignedOut>
                <SignUpButton>
                  <Button size={"lg"} className="mt-4 ">
                    Become a Publisher
                  </Button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <Link href="/blogEditor">
                  <Button size={"lg"} className="mt-4 ">
                    Publish a Blog
                  </Button>
                </Link>
              </SignedIn>
            </div>
          </m.div>
        </MaxWidthWrapper>

        <m.div
          variants={variants}
          animate="animate"
          initial="initial"
          transition={{
            delay: 0.7,
            duration: 0.7,
            ease: "easeInOut",
          }}
          className="relative isolate z-10 mt-12 sm:mt-16"
        >
          <div
            aria-hidden
            className="w-full max-w-xs md:max-w-md lg:max-w-2xl pointer-events-none h-[320px] md:h-[448px] lg:h-[672px] bg-primary rounded-full blur-3xl opacity-5 -translate-y-[30%] -z-50 absolute left-6 top-0"
          />

          <div className="max-w-7xl w-full mx-auto px-4 sm:px-8">
            <div className="rounded-lg relative w-full aspect-w-16 aspect-h-10 h-auto">
              <Image
                fill
                priority
                src={"/hero_demo.jpg"}
                alt="Dashboard Preview Picture"
                className="object-cover object-center rounded-lg border-[1px] border-gray-900/10 shadow-xl"
              />
            </div>
          </div>
        </m.div>
      </section>
    </LazyMotion>
  );
};

export const ParallaxRevampedHero = () => {
  const targetedRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetedRef,
    offset: ["start start", "1 0.5"],
  });

  const bgOpacity = useTransform(
    scrollYProgress,
    [0, 0.4, 0.9, 1],
    [0.5, 0.1, 0.1, 0.5]
  );

  const y = useTransform(scrollYProgress, [0, 0.45, 1], [0, -120, -120]);

  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.45], [1, 1, 0]);

  const display = useTransform(scrollYProgress, (pos) =>
    pos === 1 ? "none" : "block"
  );

  const imageY = useTransform(scrollYProgress, [0, 0.95], [0, 60]);
  const imageScale = useTransform(scrollYProgress, [0, 0.95], [1, 1.3]);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.085, duration: 1.25 });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <LazyMotion features={loadFeatures}>
      <section ref={targetedRef} className="overlay-image">
        <m.div
          style={{ opacity, y, display }}
          className="fixed top-44 min-[470px]:top-44 inset-x-0 z-10 will-change-transform"
        >
          <div className="w-full flex flex-col gap-8 items-center">
            <BlurFade duration={0.5}>
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-semibold font-brand text-[#F6F5AE] text-center">
                Explore Literary <br /> Treasures
              </h1>
            </BlurFade>

            <div className="h-[44px] mt-4 ">
              <SignedOut>
                <SignUpButton>
                  <ShimmerButton
                    shimmerSize="3px"
                    shimmerDuration="2s"
                    background="#A0522D"
                    shimmerColor="#EFD780"
                    className={buttonVariants({
                      size: "lg",
                      className: "h-12 px-12",
                    })}
                  >
                    Become a Publisher
                  </ShimmerButton>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <Link href="/blogEditor">
                  <ShimmerButton
                    shimmerSize="3px"
                    shimmerDuration="2s"
                    background="#A0522D"
                    shimmerColor="#EFD780"
                    className={buttonVariants({
                      size: "lg",
                      className: "h-12 px-12",
                    })}
                  >
                    Publish a Blog
                  </ShimmerButton>
                </Link>
              </SignedIn>
            </div>
          </div>
        </m.div>

        <div className="h-[300vh] w-full contain-paint">
          <m.div
            style={{ scale: imageScale, y: imageY }}
            className="h-screen w-full sticky top-0 will-change-transform"
          >
            <m.div
              style={{ opacity: bgOpacity }}
              className="absolute inset-0 bg-black z-10"
            />

            <HeroImage
              priority
              images={{
                tabs: "/tabs_bg.jpg",
                mobiles: "/mobiles_bg.jpg",
                desktop: "/desktop_bg.jpg",
              }}
            />
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
};
