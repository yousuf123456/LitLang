import React from "react";

import { Highlight } from "@/components/Highlight";
import { Button } from "@/components/ui/button";
import { PricingPlanFeatures } from "./PricingPlanFeatures";
import { Subscribe } from "./Subscribe";

export const Pricing = () => {
  return (
    <section
      id="pricing"
      className="w-full flex flex-col gap-16 md:gap-24 items-center px-4 pt-8"
    >
      <div className="w-full flex flex-col items-center gap-2 px-4 z-40">
        <div className="flex gap-3 items-center max-w-fit border-[1px] rounded-full px-3 py-1 transition-all border-gray-300 bg-white/50">
          <p className="text-xs text-zinc-900">Become a Pro</p>
        </div>

        <div className="w-full flex justify-center">
          <h1 className="text-center text-3xl sm:text-4xl font-bold text-gray-800 max-w-[360px] leading-10 sm:leading-[48px]">
            Harness the Power of <Highlight>LitLang</Highlight>
          </h1>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 w-full sm:justify-center max-w-lg sm:max-w-2xl lg:max-w-full">
        <div className="to-primary from-gray-900 bg-gradient-to-br px-6 py-2 sm:min-w-96 rounded-lg">
          <div className="flex flex-col gap-2 sm:gap-4 mx-auto sm:items-center lg:items-start w-full max-sm:max-w-full max-lg:max-w-sm">
            <p className="text-base text-gray-200 font-medium">Pro</p>
            <div className="flex items-end gap-1">
              <p className="font-bold text-5xl text-slate-200">$5</p>
              <p className="text-slate-300 text-sm">\ month</p>
            </div>
            <p className="text-slate-300 text-sm max-w-xs sm:text-center lg:text-start">
              Empower your educational journey with our premium resources
            </p>

            <Subscribe btnClassName="bg-white text-primary hover:bg-white max-lg:hidden max-w-96 w-full" />
          </div>
        </div>

        <PricingPlanFeatures />

        <Subscribe btnClassName="from-gray-900 bg-gradient-to-br to-primary hover:bg-gray-900/90 w-full lg:hidden" />
      </div>
    </section>
  );
};
