import React from "react";
import Image from "next/image";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { SignUpButton } from "@clerk/nextjs";
import { AnimatedHeading } from "./AnimatedHeading";

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

          <SignUpButton>
            <Button size={"lg"} className="mt-4 bg-brown-800">
              Become a Publisher
            </Button>
          </SignUpButton>
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
