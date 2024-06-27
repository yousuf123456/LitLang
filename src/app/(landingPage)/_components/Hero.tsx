import React from "react";
import Image from "next/image";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";

export const Hero = () => {
  return (
    <>
      <MaxWidthWrapper className="mt-16 lg:mt-24 px-5">
        <div className="flex flex-col gap-3 w-full items-center">
          <div className="flex gap-3 items-center max-w-fit cursor-pointer border-[1px] border-gray-200 bg-white rounded-full px-1 py-0.5 pr-4 transition-all  hover:border-gray-300 hover:bg-white/50">
            <div className="rounded-full px-4 bg-primary">
              <p className="text-xs sm:py-0.5 font-semibold text-white">New</p>
            </div>

            <p className="text-xs text-zinc-900">
              LitLang Celebrates Public Debut!
            </p>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold max-w-xl md:max-w-4xl text-center font-primary">
            Transforming your academic journey with unparalleled excellence in
            literature and linguistics
          </h1>

          <p className="mt-3 text-zinc-600 text-sm md:text-base lg:text-lg max-w-3xl text-center">
            Discover, Learn, and Excel with Our Educational Notes.
          </p>
        </div>
      </MaxWidthWrapper>

      <div className="relative isolate -z-50 mt-8 sm:mt-12">
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
    </>
  );
};
