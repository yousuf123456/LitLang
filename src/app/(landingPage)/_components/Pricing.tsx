import React from "react";

import { Subscribe } from "./Subscribe";
import { Highlight } from "@/components/Highlight";
import { PricingPlanFeatures } from "./PricingPlanFeatures";
import AnimatedShinyText from "@/components/magicui/animated-shiny-text";

export const Pricing = () => {
  return (
    <section
      id="pricing"
      className="w-full max-w-[1180px] mx-auto flex flex-col gap-16 md:gap-24 items-center px-3 pt-24 md:pt-36"
    >
      <div className="w-full flex flex-col items-center gap-2 px-4 z-40">
        <div className="px-3 py-1 border border-gray-300 bg-gray-50 rounded-2xl">
          <AnimatedShinyText className="text-sm font-medium font-secondary">
            ✨ Become a Pro
          </AnimatedShinyText>
        </div>

        <div className="w-full flex justify-center">
          <h2 className="text-center text-3xl min-[420px]:text-4xl sm:text-5xl font-[550] text-gray-800 leading-[48px] sm:leading-[60px] font-brand">
            Harness the Power of <br /> <Highlight>LitLang</Highlight>
          </h2>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 w-full sm:justify-center max-w-lg sm:max-w-2xl lg:max-w-full">
        <div className="to-primary via-gray-800 from-gray-900 bg-gradient-to-br p-6 sm:min-w-96 rounded-lg">
          <div className="flex flex-col gap-2 sm:gap-4 mx-auto sm:items-center lg:items-start w-full max-sm:max-w-full max-lg:max-w-sm">
            <p className="text-base text-gray-200 font-medium">Pro</p>
            <div className="flex items-end gap-1">
              <p className="font-[550] font-brand text-4xl sm:text-5xl text-slate-200">
                $5
              </p>
              <p className="text-slate-200 text-sm">\ month</p>
            </div>

            <p className="text-slate-200 text-sm max-w-xs sm:text-center lg:text-start font-secondary">
              Empower your educational journey with our premium resources
            </p>

            <Subscribe btnClassName="bg-white text-brown-800 hover:bg-white max-lg:hidden max-w-96 w-full" />
          </div>
        </div>

        <PricingPlanFeatures />

        <Subscribe btnClassName="from-gray-900 bg-gradient-to-br to-primary hover:bg-gray-900/90 w-full lg:hidden" />
      </div>
    </section>
  );
};
