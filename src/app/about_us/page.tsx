"use client";

import React, { useRef } from "react";

import { m, LazyMotion, useTransform, useSpring } from "framer-motion";
const loadFeatures = () =>
  import("@/app/utils/features").then((res) => res.default);

import Image from "next/image";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";

import { BsLinkedin, BsTwitter } from "react-icons/bs";
import { useScroll } from "framer-motion";
import { AnimatedLetters } from "@/components/ui/animated-letters";
import { OverlayImageHeader } from "@/components/OverlayImageHeader";

const FounderCard = ({
  image,
  name,
  post,
}: {
  image: string;
  name: string;
  post: string;
}) => {
  return (
    <article className="flex gap-6 items-center bg-zinc-100 mx-auto rounded-xl pr-8 max-w-xl w-full">
      <div className="relative w-[140px] sm:w-[180px] lg:w-[230px] aspect-1 rounded-l-xl overflow-hidden flex-shrink-0">
        <Image
          alt="Founder Picture"
          src={image}
          className="object-cover"
          fill
        />
      </div>

      <div className="flex flex-col gap-1">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800">
          {name}
        </h2>
        <p className="text-base sm:text-lg text-zinc-600 font-medium mt-4">
          {post}
        </p>
        <div className="flex items-center gap-4">
          <BsLinkedin className="w-5 h-5" />
          <BsTwitter className="w-5 h-5" />
        </div>
      </div>
    </article>
  );
};

export default function AboutUsPage() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0.05 end", "0 0.2"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);

  const leftX = useTransform(scrollYProgress, [0, 1], [-160, 0]);
  const rightX = useTransform(scrollYProgress, [0, 1], [160, 0]);

  return (
    <div className="flex flex-col">
      <OverlayImageHeader
        buttonLabel="More About Us"
        heading={["Nurturing the Love", "of Literature"]}
        overlayImages={{
          desktop: "/desktop_aboutus.jpg",
          mobiles: "/mobiles_aboutus.jpg",
        }}
      />

      <article id="data-container" className="flex flex-col gap-24 px-6 pt-20">
        <section className="flex flex-col gap-4 max-w-4xl mx-auto">
          <p className="text-base sm:text-lg text-zinc-700 text-center">
            Welcome to <span className="font-medium text-black">LitLang,</span>{" "}
            your premier destination for literature and linguistic notes. We
            provide curated resources and a platform for writers to publish
            their thoughts through blogs and texts.
          </p>
        </section>

        <section className="flex flex-col gap-4 max-w-4xl mx-auto">
          <h2 className="text-center font-brand sm:text-4xl text-3xl font-[550] tracking-tight text-primary">
            Our Mission
          </h2>

          <p className="sm:text-lg text-zinc-700 text-center">
            Our mission is to enrich understanding and foster creativity in
            literature and linguistics, empowering individuals through valuable
            insights and community support.
          </p>
        </section>

        <section
          ref={ref}
          className="flex flex-col gap-10 sm:gap-16 overflow-x-hidden pt-6"
        >
          <LazyMotion features={loadFeatures} strict>
            <m.h1
              style={{
                y,
                opacity: scrollYProgress,
              }}
              className="text-center font-[550] font-brand tracking-tight text-3xl sm:text-4xl text-primary"
            >
              Meet the founders
            </m.h1>
          </LazyMotion>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
            <LazyMotion features={loadFeatures} strict>
              <m.div style={{ x: leftX, opacity: scrollYProgress }}>
                <FounderCard
                  image="https://images.unsplash.com/photo-1475669913832-fd187510b578?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWVufGVufDB8fDB8fHww"
                  name="Syed Yaseen"
                  post="Founder"
                />
              </m.div>

              <m.div style={{ x: rightX, opacity: scrollYProgress }}>
                <FounderCard
                  image="https://images.unsplash.com/photo-1496346236646-50e985b31ea4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWVufGVufDB8fDB8fHww"
                  name="Mujtaba"
                  post="Co Founder"
                />
              </m.div>
            </LazyMotion>
          </div>
        </section>
      </article>
    </div>
  );
}
