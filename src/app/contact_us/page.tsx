"use client";
import React from "react";

import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";

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
import { globeConfig } from "@/data/globe/config";
import { sampleArcs } from "@/data/globe/arcs";
import { Form } from "./Form";

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

        <Form />
      </div>
    </MaxWidthWrapper>
  );
}
