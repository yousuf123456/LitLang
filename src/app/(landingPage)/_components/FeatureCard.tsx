import React, { useEffect, useRef } from "react";

import { useInView } from "react-intersection-observer";
import { m, useAnimation, LazyMotion } from "framer-motion";
import Link from "next/link";

const loadFeatures = () =>
  import("@/app/utils/features").then((res) => res.default);

export default function FeatureCard({
  href,
  Icon,
  title,
  iconLabel,
  description,
}: {
  Icon: any;
  href: string;
  title: string;
  iconLabel: string;
  description: string;
  featureNumber: number;
}) {
  // const varianst = {
  //   initial: {
  //     y: 28,

  //     opacity: 0.1,
  //   },
  //   animate: {
  //     y: 0,

  //     opacity: 1,
  //   },
  // };

  // const { inView, ref } = useInView({ rootMargin: "0px 0px -48px 0px" });
  // const controls = useAnimation();

  // useEffect(() => {
  //   if (!inView) return;

  //   controls.start("animate");
  // }, [inView]);

  return (
    <Link href={href}>
      {/* <LazyMotion features={loadFeatures} strict> */}
      <article
      // ref={ref}
      // initial="initial"
      // animate={controls}
      // variants={varianst}
      // transition={{
      //   type: "keyframes",
      //   duration: 0.4,
      //   ease: "easeInOut",
      // }}
      >
        <div className="p-7 rounded-xl border border-themeSecondary/60 flex flex-col gap-4 relative overflow-hidden group cursor-pointer hover:shadow-md hover:shadow-themeSecondary/30 transition-shadow">
          <div className="pointer-events-none" aria-hidden>
            <div className="absolute inset-0 rounded-2xl">
              <svg
                aria-hidden="true"
                className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-[#A44200]/[0.05] stroke-[#A44200]/20 dark:fill-white/1 dark:stroke-white/2.5"
              >
                <defs>
                  <pattern
                    id=":Rkqpuja:"
                    width="72"
                    height="56"
                    patternUnits="userSpaceOnUse"
                    x="50%"
                    y="16"
                  >
                    <path d="M.5 56V.5H72" fill="none"></path>
                  </pattern>
                </defs>
                <rect
                  width="100%"
                  height="100%"
                  strokeWidth="0"
                  fill="url(#:Rkqpuja:)"
                ></rect>
                <svg x="50%" y="16" className="overflow-visible">
                  <rect
                    strokeWidth="0"
                    width="73"
                    height="57"
                    x="0"
                    y="56"
                  ></rect>
                  <rect
                    strokeWidth="0"
                    width="73"
                    height="57"
                    x="72"
                    y="168"
                  ></rect>
                </svg>
              </svg>
            </div>
          </div>

          {/* <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 bg-gradient-to-r from-brown-500/10 to-brown-800/10 z-20 transition-colors"
          /> */}

          <Icon
            className="w-7 h-7 text-themeSecondary z-20"
            aria-label={iconLabel}
          />

          <p className="font-semibold text-themeSecondary text-lg mt-0 z-20">
            {title}
          </p>

          <p className="text-white/70 tracking-tight z-20">{description}</p>
        </div>
      </article>
      {/* </LazyMotion> */}
    </Link>
  );
}
