import React from "react";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { Underline } from "@/components/Underline";
import Image from "next/image";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export const Universities = () => {
  const universitiesData = [
    {
      name: "National University of Modern Languages",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqCy6TdNHRPK5-VF29KfqtFjphncrsuBETKA&s",
    },
    {
      name: "International Islamic University",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqCy6TdNHRPK5-VF29KfqtFjphncrsuBETKA&s",
    },
    {
      name: "National University of Science and Technology",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqCy6TdNHRPK5-VF29KfqtFjphncrsuBETKA&s",
    },
  ];

  return (
    <MaxWidthWrapper className="mt-8 md:mt-20 lg:px-24 md:px-16 sm:px-8 px-6">
      <div className="flex flex-col gap-10 w-full">
        <div className="flex justify-center w-full">
          <Underline>
            <h2 className="text-2xl md:text-3xl font-semibold text-black">
              Universities
            </h2>
          </Underline>
        </div>

        <ScrollArea>
          <div className="flex gap-5">
            {universitiesData.map((uni, i) => (
              <div
                key={i}
                className="w-full min-w-72 h-auto aspect-video rounded-xl overflow-hidden relative flex justify-center items-center px-5 py-3 cursor-pointer group"
              >
                <Image alt="University Image" src={uni.image} fill />

                <div
                  className={
                    "absolute inset-0 bg-black z-10 opacity-40 group-hover:opacity-50 transition-opacity"
                  }
                />

                <p className="text-lg md:text-xl font-semibold text-white text-center z-20 max-w-[240px]">
                  {uni.name}
                </p>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </MaxWidthWrapper>
  );
};
