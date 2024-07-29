"use client";
import React, { useRef } from "react";

import { Heading } from "./Heading";
import { HeroImage } from "@/app/(landingPage)/_components/HeroImage";

import { LazyMotion, m, useScroll, useTransform } from "framer-motion";
import { Button } from "./ui/button";
import { StaticImageData } from "next/image";
import { scrollToElement } from "@/utils/utils";
const loadFeatures = () =>
  import("@/app/utils/features").then((res) => res.default);

export const OverlayImageHeader = ({
  heading,
  children,
  subHeading,
  buttonLabel,
  overlayImages,
}: {
  buttonLabel?: string;
  subHeading?: string;
  heading: string | string[];
  children?: React.ReactNode;
  overlayImages: {
    [key in "tabs" | "desktop" | "mobiles"]?: string;
  };
}) => {
  // const onClick = () => {
  //   const dataContainer = document.getElementById("data-container");
  //   if (!dataContainer) return;

  //   const elementPosition = dataContainer.getBoundingClientRect().top;

  //   const offsetPosition = elementPosition + window.scrollY - 48;

  //   window.scrollTo({
  //     top: offsetPosition,
  //     behavior: "smooth",
  //   });
  // };

  const targetedRef = useRef<null | HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetedRef,
    offset: ["0 0", "1 0"],
  });

  const y = useTransform(scrollYProgress, [0, 0.5], [0, -48]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 0]);

  return (
    <div ref={targetedRef} className="h-screen w-full relative overlay-image">
      <LazyMotion features={loadFeatures} strict>
        <m.div
          style={{ y, opacity }}
          className="absolute z-20 inset-0 flex flex-col gap-5 justify-center items-center"
        >
          {children}

          <Heading subHeading={subHeading}>
            {typeof heading === "string"
              ? heading
              : heading.map((headingPart, i) => {
                  if (i === 0) return headingPart;
                  else
                    return (
                      <>
                        <br />
                        {headingPart}
                      </>
                    );
                })}
          </Heading>

          {buttonLabel && (
            <Button
              size={"lg"}
              onClick={() => scrollToElement("data-container", 48)}
              className="mt-4"
            >
              {buttonLabel}
            </Button>
          )}
        </m.div>

        <m.div
          style={{ opacity: overlayOpacity }}
          className="bg-black z-10 absolute inset-0"
        />

        <HeroImage images={overlayImages} priority />
      </LazyMotion>
    </div>
  );
};
