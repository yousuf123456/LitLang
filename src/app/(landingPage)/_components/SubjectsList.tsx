"use client";
import React, { useState } from "react";

import Link from "next/link";

import { SubjectCard } from "@/app/subjects/_components/SubjectCard";
import { SubjectType } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const SubjectsList = ({ subjects }: { subjects: SubjectType[] }) => {
  const [hoveredIndex, setHoveredIndex] = useState<null | number>(null);

  return (
    <Carousel
      className="w-full"
      opts={{
        loop: true,
      }}
    >
      <CarouselNext className="hidden sm:block" />
      <CarouselPrevious className="hidden sm:block" />
      <CarouselContent>
        {subjects.map((subject, i) => (
          <CarouselItem className="min-[840px]:basis-1/2" key={i}>
            <Link
              href={`/subjects/${subject.id}`}
              className="relative p-1.5 sm:p-3 lg:p-4 block"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <AnimatePresence>
                {hoveredIndex === i && (
                  <motion.span
                    className="absolute inset-0 h-full w-full bg-zinc-100 dark:bg-slate-800/[0.8] block  rounded-3xl -z-10"
                    layoutId="hoverBackground"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { duration: 0.15 },
                    }}
                    exit={{
                      opacity: 0,
                      transition: { duration: 0.15, delay: 0.2 },
                    }}
                  />
                )}
              </AnimatePresence>
              <SubjectCard subject={subject} />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
