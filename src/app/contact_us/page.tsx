import React from "react";
import { Highlight } from "@/components/Highlight";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { World } from "@/components/ui/globe";

import { sampleArcs } from "@/data/globe/arcs";
import { globeConfig } from "@/data/globe/config";

export default function ContactUsPage() {
  return (
    <MaxWidthWrapper className="lg:mt-28 px-8">
      <div className="flex lg:flex-row flex-col justify-center items-center lg:gap-16">
        <div className="relative max-sm:pb-8 max-lg:pb-16 w-[360px] h-[360px] sm:w-[420px] sm:h-[420px] xl:w-[520px] xl:h-[520px] z-10 max-lg:bg-dot-black/[0.3]">
          <div className="absolute pointer-events-none inset-0 -bottom-12 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_5%,black)]"></div>
          <World data={sampleArcs} globeConfig={globeConfig} />
        </div>
        <div className="flex flex-col gap-8 max-w-2xl lg:max-w-xl z-50">
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
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
