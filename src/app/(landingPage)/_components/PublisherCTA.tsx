"use client";

import React, { useRef } from "react";

import Image from "next/image";
import { Button } from "@/components/ui/button";

import { m, LazyMotion, useScroll, useTransform } from "framer-motion";

import { SignedIn, SignedOut, SignUpButton } from "@clerk/nextjs";

import Link from "next/link";

const loadFeatures = () =>
  import("@/app/utils/features").then((res) => res.default);

export const RevampedPublisherCTA = () => {
  const targetedRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetedRef,
    offset: ["start 0.85", "end 0.15"],
  });

  const overlayOpacity = useTransform(
    scrollYProgress,
    [0.55, 0.65, 1],
    [0.4, 0, 0]
  );

  const scale = useTransform(scrollYProgress, [0.7, 1], [1, 0.935]);

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
          className="top-48 absolute w-full h-[120vh] flex justify-center items-center z-10 flex-col gap-6 px-6"
        >
          <h2 className="text-6xl sm:text-7xl font-semibold text-[#F6F5AE] text-center font-brand">
            Your Stories Matter
          </h2>

          <p className="font-regular text-base sm:text-lg text-[#F6F5AE] text-center">
            Publish Blogs on Our Platform and Connect with Readers Worldwide!
          </p>

          <div className="h-[44px] mt-4">
            <SignedOut>
              <SignUpButton>
                <Button size={"lg"}>Become a Publisher</Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link href="/blogEditor">
                <Button size={"lg"}>Publish a Blog</Button>
              </Link>
            </SignedIn>
          </div>
        </m.div>

        <m.div
          style={{ scale }}
          className="w-full h-screen sticky bottom-0 top-0"
        >
          <m.div
            style={{ opacity: overlayOpacity }}
            className="absolute inset-0 bg-black z-10"
          />

          <Image
            fill
            src={"/book.jpg"}
            alt="Background Image"
            className="object-cover object-center"
          />
        </m.div>
      </LazyMotion>
    </section>
  );
};
