import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { Highlight } from "@/components/Highlight";
import { Verified, X } from "lucide-react";
import React from "react";
import { Footer } from "../(landingPage)/_components/Footer";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function PricingPage() {
  const features = [
    {
      text: "Easily accessible notes.",
      availability: {
        standard: true,
        premium: true,
      },
    },
    {
      text: "Study materials for Universities.",
      availability: {
        standard: true,
        premium: true,
      },
    },
    {
      text: "Chance to publish your literary ideas.",
      availability: {
        standard: true,
        premium: true,
      },
    },
    {
      text: "Premium handwritten notes.",
      availability: {
        standard: false,
        premium: true,
      },
    },
    {
      text: "Voice explanation of required topics.",
      availability: {
        standard: false,
        premium: true,
      },
    },
    {
      text: "Assistance in Assignments",
      availability: {
        standard: false,
        premium: true,
      },
    },
    {
      text: "Assistance in Presentations.",
      availability: {
        standard: false,
        premium: true,
      },
    },
    {
      text: "Help from professional tutors.",
      availability: {
        standard: false,
        premium: true,
      },
    },
  ];

  return (
    <MaxWidthWrapper className="mt-12 md:mt-20 p-1">
      <div className="flex flex-col gap-16 md:gap-24 items-center">
        <div className="w-full flex flex-col items-center gap-0 px-4">
          <div className="flex gap-3 items-center max-w-fit border-[1px] rounded-full px-3 py-1 transition-all border-gray-300 bg-white/50">
            <p className="text-xs text-zinc-900">Become a Pro</p>
          </div>

          <div className="w-full flex justify-center">
            <h1 className="text-center text-3xl sm:text-4xl font-bold text-gray-800 max-w-[360px] leading-10 sm:leading-[48px]">
              Harness the Power of <Highlight>LitLang</Highlight>
            </h1>
          </div>
        </div>

        <div className="flex max-sm:flex-col gap-12 sm:gap-0 w-full justify-center items-center">
          <div className="flex flex-col gap-4 w-full max-w-sm">
            <div className="flex flex-col gap-2 px-4 py-2 ">
              <p className="text-base text-zinc-800 font-medium">Standard</p>
              <div className="flex items-end gap-1">
                <p className="font-bold text-5xl text-gray-800">$0</p>
                <p className="text-zinc-500 text-sm">\ month</p>
              </div>
              <p className="text-zinc-500 text-sm max-w-xs">
                All the basic material to boost your educational career
              </p>
            </div>

            <div className="border border-zinc-400 sm:border-r-0 grid grid-cols-1 auto-rows-[3rem]">
              {features.map((feature, i) => (
                <div
                  key={i}
                  className={cn(
                    "border-b border-b-zinc-400 flex justify-between items-center px-4 py-2",
                    i === features.length - 1 && "border-b-0"
                  )}
                >
                  <p className="text-zinc-700 text-sm">{feature.text}</p>

                  {feature.availability.standard ? (
                    <Verified className="w-6 h-6 fill-gray-900 text-white" />
                  ) : (
                    <X className="text-red-400 w-5 h-5" />
                  )}
                </div>
              ))}
            </div>

            <div className="px-4 w-full">
              <Button variant={"secondary"} className="w-full">
                Subsribed
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full max-w-sm">
            <div className="flex flex-col gap-2 to-primary from-gray-900 bg-gradient-to-br px-4 py-2">
              <p className="text-base text-gray-200 font-medium">Pro</p>
              <div className="flex items-end gap-1">
                <p className="font-bold text-5xl text-gray-200">$5</p>
                <p className="text-gray-400 text-sm">\ month</p>
              </div>
              <p className="text-gray-400 text-sm max-w-xs">
                Empower your educational journey with our premium resources
              </p>
            </div>

            <div className="border border-zinc-400 grid grid-cols-1 auto-rows-[3rem]">
              {features.map((feature, i) => (
                <div
                  key={i}
                  className={cn(
                    "border-b border-b-zinc-400 flex justify-between items-center px-4 py-2",
                    i === features.length - 1 && "border-b-0"
                  )}
                >
                  <p className="text-zinc-700 text-sm">{feature.text}</p>

                  {feature.availability.premium ? (
                    <Verified className="w-6 h-6 fill-gray-900 text-white" />
                  ) : (
                    <X className="text-red-400 w-5 h-5" />
                  )}
                </div>
              ))}
            </div>

            <div className="px-4 w-full">
              <Button className="from-gray-900 bg-gradient-to-br to-primary hover:bg-gray-900/90 w-full">
                Subsribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </MaxWidthWrapper>
  );
}
