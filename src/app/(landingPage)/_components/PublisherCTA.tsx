import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Boxes } from "@/components/ui/background-boxes";

export const PublisherCTA = () => {
  return (
    <div className="w-full relative mt-24 md:mt-36 px-3 sm:px-6 lg:px-12 py-12 md:py-24 bg-slate-900 overflow-hidden flex md:flex-row flex-col max-md:items-center md:justify-center gap-6 md:gap-12 lg:gap-24">
      <Boxes />
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <div className="lg:w-[380px] lg:h-[256px] w-[220px] h-[216px] sm:w-[300px] sm:h-[236px] z-20 bg-slate-900 bg-opacity-40 relative flex-shrink-0">
        <Image alt="Illustration" src={"/blogging.svg"} fill />
      </div>

      <div className="flex flex-col gap-8 sm:gap-12 max-w-lg items-center z-20 bg-slate-900 bg-opacity-60 rounded-2xl p-3">
        <p className="text-3xl sm:text-4xl lg:text-[42px] leading-10 font-bold text-center text-slate-300">
          Share Your Voice, Publish Your Own Blog Today!
        </p>

        <div>
          <Button
            size={"lg"}
            className="bg-slate-300 text-black hover:bg-slate-300/90"
          >
            Become a Publisher
          </Button>
        </div>
      </div>
    </div>
  );
};
