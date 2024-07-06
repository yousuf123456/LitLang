"use client";
import React from "react";

import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { BsBook, BsNewspaper } from "react-icons/bs";
import { Notebook, Pen, Star, Text } from "lucide-react";

import dynamic from "next/dynamic";
const FeatureCard = dynamic(() => import("./FeatureCard"), { ssr: false });

export const Features = () => {
  return (
    <section>
      <MaxWidthWrapper className="section-content flex flex-col gap-12 overflow-x-hidden px-6 xl:px-0">
        <h2 className="text-3xl font-semibold text-gray-800 text-center">
          Literature at Your Fingertips
        </h2>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-7 sm:gap-y-10">
          <li>
            <FeatureCard
              Icon={BsBook}
              featureNumber={1}
              iconLabel={"Books"}
              title="Featured Books"
              description="Explore worlds within pages. Dive into our captivating collection of
            books today!"
            />
          </li>

          <li>
            <FeatureCard
              Icon={Star}
              featureNumber={2}
              title="Book Reviews"
              iconLabel={"Books Reviews"}
              description="Explore worlds within pages. Dive into our captivating collection of
            books today!"
            />
          </li>

          <li>
            <FeatureCard
              Icon={Notebook}
              featureNumber={3}
              iconLabel={"Notes"}
              title="Featured Notes"
              description="Explore worlds within pages. Dive into our captivating collection of
            books today!"
            />
          </li>

          <li>
            <FeatureCard
              featureNumber={4}
              Icon={BsNewspaper}
              iconLabel={"Blogs"}
              title="Featured Blogs"
              description="Explore worlds within pages. Dive into our captivating collection of
            books today!"
            />
          </li>

          <li>
            <FeatureCard
              Icon={Pen}
              featureNumber={5}
              iconLabel={"Articles"}
              title="Featured Articles"
              description="Explore worlds within pages. Dive into our captivating collection of
            books today!"
            />
          </li>

          <li>
            <FeatureCard
              Icon={Text}
              featureNumber={6}
              iconLabel={"Texts"}
              title="Featured Texts"
              description="Explore worlds within pages. Dive into our captivating collection of
            books today!"
            />
          </li>
        </ul>
      </MaxWidthWrapper>
    </section>
  );
};
