import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { Underline } from "@/components/Underline";
import Image from "next/image";
import React from "react";

export const Features = () => {
  const featuresData = [
    {
      title: "Books",
      image: "/Books.jfif",
    },
    {
      title: "Book Reviews",
      image: "",
    },
    {
      title: "Blogs",
      image: "",
    },
    {
      title: "Articles",
      image: "",
    },
    {
      title: "Notes",
      image: "",
    },
  ];

  return (
    <MaxWidthWrapper className="mt-24 md:mt-36 lg:px-24 md:px-16 sm:px-8 px-6">
      <div className="flex flex-col gap-10 w-full">
        <div className="flex justify-center w-full">
          <Underline>
            <h2 className="text-2xl md:text-3xl font-semibold text-black">
              Features
            </h2>
          </Underline>
        </div>

        <div className="max-w-5xl mx-auto w-full">
          <div className="grid grid-cols-1 sm:grid-cols-3 auto-rows-[9rem] sm:auto-rows-[24rem] gap-3 w-full">
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-3">
              <div className="w-full h-full rounded-xl overflow-hidden relative group px-4 py-2 cursor-pointer flex items-center justify-center">
                <Image
                  alt="Books Image"
                  src={"/Books.jfif"}
                  className=" object-cover"
                  fill
                />

                <div className="absolute inset-0 bg-black z-10 opacity-40 group-hover:opacity-50 transition-opacity" />

                <p className="text-lg md:text-xl font-semibold text-white text-center z-20">
                  {featuresData[0].title}
                </p>
              </div>

              <div className="w-full h-full rounded-xl overflow-hidden relative group px-4 py-2 cursor-pointer flex items-center justify-center">
                <Image
                  alt="Books Image"
                  src={"/Books.jfif"}
                  className=" object-cover"
                  fill
                />

                <div className="absolute inset-0 bg-black z-10 opacity-40 group-hover:opacity-50 transition-opacity" />

                <p className="text-lg md:text-xl font-semibold text-white text-center z-20">
                  {featuresData[1].title}
                </p>
              </div>
            </div>

            <div className="w-full h-full rounded-xl overflow-hidden relative group px-4 py-2 cursor-pointer flex items-center justify-center">
              <Image
                alt="Books Image"
                src={"/Books.jfif"}
                className=" object-cover"
                fill
              />

              <div className="absolute inset-0 bg-black z-10 opacity-40 group-hover:opacity-50 transition-opacity" />

              <p className="text-lg md:text-xl font-semibold text-white text-center z-20">
                {featuresData[2].title}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-1 gap-3">
              <div className="w-full h-full rounded-xl overflow-hidden relative group px-4 py-2 cursor-pointer flex items-center justify-center">
                <Image
                  alt="Books Image"
                  src={"/Books.jfif"}
                  className=" object-cover"
                  fill
                />

                <div className="absolute inset-0 bg-black z-10 opacity-40 group-hover:opacity-50 transition-opacity" />

                <p className="text-lg md:text-xl font-semibold text-white text-center z-20">
                  {featuresData[3].title}
                </p>
              </div>

              <div className="w-full h-full rounded-xl overflow-hidden relative group px-4 py-2 cursor-pointer flex items-center justify-center">
                <Image
                  alt="Books Image"
                  src={"/Books.jfif"}
                  className=" object-cover"
                  fill
                />

                <div className="absolute inset-0 bg-black z-10 opacity-40 group-hover:opacity-50 transition-opacity" />

                <p className="text-lg md:text-xl font-semibold text-white text-center z-20">
                  {featuresData[4].title}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};
