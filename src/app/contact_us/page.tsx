"use client";
import React, { useEffect, useRef } from "react";

import { motion, useAnimation, useInView } from "framer-motion";
import { Highlight } from "@/components/Highlight";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import dynamic from "next/dynamic";

const World = dynamic<any>(
  () => import("@/components/ui/globe").then((mod) => mod.World),
  {
    ssr: false,
    suspense: true,
    loading: () => <p>Loading...</p>,
  }
);

import { sampleArcs } from "@/data/globe/arcs";
import { globeConfig } from "@/data/globe/config";

export default function ContactUsPage() {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    margin: "0px 0px -150px 0px",
  });

  const variants = {
    slideIn: {
      opacity: [0, 0.2, 0.3, 1],
      left: 0,
    },
  };

  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("slideIn");
  }, [controls, inView]);

  return (
    <MaxWidthWrapper className="lg:mt-28 px-8">
      <div className="flex lg:flex-row flex-col justify-center items-center lg:gap-16">
        <div className="relative h-full max-lg:bg-dot-black/[0.5] z-10 flex items-center max-sm:pt-16 max-sm:pb-16 max-lg:pb-16">
          <div className="absolute pointer-events-none inset-0 -bottom-12 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_5%,black)]"></div>
          <div className="relative w-[350px] h-[350px] sm:w-[440px] sm:h-[440px] xl:w-[520px] xl:h-[520px]">
            <World data={sampleArcs} globeConfig={globeConfig} />
          </div>
        </div>

        <motion.div
          ref={ref}
          animate={controls}
          variants={variants}
          initial={{ left: 220, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col gap-8 max-w-2xl lg:max-w-xl z-50 relative"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
            <Highlight className="min-w-64">Anytime, Anywhere</Highlight> —your
            support team.
          </h1>

          <div className="flex flex-col gap-4 lg:pr-12">
            <Input placeholder="Your Name" />
            <Input placeholder="Your Email" />
            <Textarea
              placeholder="Your Message For Us"
              className=" resize-none h-36"
            />
          </div>

          <Button className="from-gray-900 bg-gradient-to-br to-primary hover:bg-gray-900/90 w-fit">
            Send Message
          </Button>
        </motion.div>
      </div>
    </MaxWidthWrapper>
  );
}
