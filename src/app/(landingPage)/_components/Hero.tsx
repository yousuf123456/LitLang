import React from "react";
import Image from "next/image";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { Highlight } from "@/components/Highlight";

export const Hero = () => {
  return (
    <div className="w-full h-full bg-grid-black/[0.1] relative pb-16">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_60%,black)]"></div>
      <MaxWidthWrapper className="mt-4 pt-12 lg:pt-20 px-5 z-50">
        <div className="flex flex-col gap-3 w-full items-center">
          <div className="flex flex-col w-full items-center gap-1">
            <span className="text-3xl min-[420px]:text-4xl md:text-5xl lg:text-6xl font-bold text-center font-primary text-transparent bg-gradient-to-b from-gray-400 via-gray-700 to-gray-900 bg-clip-text">
              Your Gateway
            </span>
            <h1 className="text-3xl min-[420px]:text-4xl md:text-5xl lg:text-6xl font-bold max-w-lg md:max-w-3xl lg:max-w-4xl text-center font-primary capitalize text-gray-900">
              to Literature and Linguistic Excellence
            </h1>
          </div>

          <p className="mt-3 text-zinc-900 text-sm md:text-base lg:text-lg max-w-3xl font-medium text-center">
            Discover, Learn, and Excel with Our Educational Notes.
          </p>
        </div>
      </MaxWidthWrapper>

      <div className="relative isolate z-10 mt-8 sm:mt-12">
        <div
          aria-hidden
          className="w-full max-w-xs md:max-w-md lg:max-w-2xl pointer-events-none h-[320px] md:h-[448px] lg:h-[672px] bg-primary rounded-full blur-3xl opacity-5 -translate-y-[30%] -z-50 absolute left-6 top-0"
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <div className=" bg-gray-400/10 p-1 md:p-2 rounded-lg border-[1px] border-slate-950/5">
            <Image
              width={1364}
              height={866}
              src={"/dashboard-preview.jpg"}
              alt="Dashboard Preview Picture"
              className="object-cover object-center rounded-lg border-[1px] border-gray-900/10 shadow-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
