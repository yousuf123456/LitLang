"use client";

import React, { useEffect, useRef } from "react";

import ShimmerButton from "@/components/magicui/shimmer-button";

import { buttonVariants } from "@/components/ui/button";
import { SignedIn, SignedOut, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";

import { m, LazyMotion, useScroll, useTransform } from "framer-motion";

import Lenis from "lenis";

import { HeroImage } from "./HeroImage";
import BlurFade from "@/components/magicui/blur-fade";

const loadFeatures = () =>
  import("@/app/utils/features").then((res) => res.default);

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

  const y = useTransform(scrollYProgress, [0, 0.55, 1], [0, -120, -120]);

  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.55], [1, 1, 0]);

  const display = useTransform(scrollYProgress, (pos) =>
    pos === 1 ? "none" : "block"
  );

  const imageY = useTransform(scrollYProgress, [0, 0.95], [0, 60]);
  const imageScale = useTransform(scrollYProgress, [0, 0.95], [1, 1.3]);

  useEffect(() => {
    window.history.scrollRestoration = "manual";

    const lenis = new Lenis({ lerp: 0.09 });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
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
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-[550] font-brand text-[#F6F5AE] text-center">
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
                      className: "h-12 px-11",
                    })}
                  >
                    Get Started For Free
                  </ShimmerButton>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <Link href="/subjects">
                  <ShimmerButton
                    shimmerSize="3px"
                    shimmerDuration="2s"
                    background="#A0522D"
                    shimmerColor="#EFD780"
                    className={buttonVariants({
                      size: "lg",
                      className: "h-12 px-11",
                    })}
                  >
                    Get Your Material Now
                  </ShimmerButton>
                </Link>
              </SignedIn>
            </div>
          </div>
        </m.div>

        <div className="h-[290vh] w-full contain-paint">
          <m.div
            style={{ scale: imageScale, y: imageY }}
            className="h-screen w-full sticky top-0 will-change-transform"
          >
            <m.div
              style={{ opacity: bgOpacity }}
              className="absolute inset-0 bg-black z-10"
            />

            <HeroImage
              priority={true}
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
