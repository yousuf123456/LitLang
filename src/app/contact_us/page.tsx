"use client";
import React from "react";

import { m, LazyMotion } from "framer-motion";
import { Highlight } from "@/components/Highlight";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const loadFeatures = () =>
  import("@/app/utils/features").then((res) => res.default);

import dynamic from "next/dynamic";

const World = dynamic<any>(
  () => import("@/components/ui/globe").then((mod) => mod.World),
  {
    ssr: false,
    suspense: true,
    loading: () => (
      <div className="flex items-center justify-center w-full h-full">
        <p className="max-w-md text-lg font-medium text-zinc-700">
          World is Waiting For You...
        </p>
        <Smile className="w-5 h-5 text-zinc-600" />
      </div>
    ),
  }
);

import { Smile } from "lucide-react";
import { sampleArcs } from "@/data/globe/arcs";
import { globeConfig } from "@/data/globe/config";

export default function ContactUsPage() {
  return (
    <MaxWidthWrapper className="lg:mt-28 px-8 relative pb-12 overflow-hidden">
      <div className="flex lg:flex-row flex-col justify-center items-center lg:gap-16">
        <div
          aria-hidden
          className="relative h-full max-lg:bg-dot-black/[0.5] z-10 flex items-center max-sm:pt-16 max-sm:pb-6 max-lg:pb-16"
        >
          <div className="absolute pointer-events-none inset-0 -bottom-12 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_5%,black)]"></div>

          <div className="relative w-[350px] h-[350px] sm:w-[440px] sm:h-[440px] xl:w-[520px] xl:h-[520px]">
            <World data={sampleArcs} globeConfig={globeConfig} />
          </div>
        </div>

        <LazyMotion features={loadFeatures} strict>
          <m.article
            // animate={{
            //   opacity: [0, 0.2, 0.3, 1],
            //   left: 0,
            // }}
            // initial={{ left: 220, opacity: 0 }}
            // transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex flex-col gap-8 max-w-2xl lg:max-w-xl z-50 relative"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
              <Highlight className="min-w-64">Anytime, Anywhere</Highlight>{" "}
              —your support team.
            </h1>

            <form className="flex flex-col gap-4 lg:pr-12">
              <Input placeholder="Your Name" />
              <Input placeholder="Your Email" />
              <Textarea
                placeholder="Your Message For Us"
                className=" resize-none h-36"
              />

              <Button
                type="submit"
                className="mt-4 from-gray-900 bg-gradient-to-br to-primary hover:bg-gray-900/90 w-fit"
              >
                Send Message
              </Button>
            </form>
          </m.article>
        </LazyMotion>
      </div>
    </MaxWidthWrapper>
  );
}
