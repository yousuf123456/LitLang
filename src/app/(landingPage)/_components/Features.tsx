"use client";
import React from "react";

import { IoBook } from "react-icons/io5";
import { BsNewspaper } from "react-icons/bs";
import { Notebook, Pen, Text } from "lucide-react";

import dynamic from "next/dynamic";
const FeatureCard = dynamic(() => import("./FeatureCard"));

import BlurFade from "@/components/magicui/blur-fade";
import { MdOutlineReviews } from "react-icons/md";

export const Features = () => {
  const features = [
    {
      href: "/standalones?type=Book",
      Icon: IoBook,
      iconLabel: "Book",
      title: "Featured Books",
      description: "Dive into our captivating collection of books today!",
    },
    {
      href: "/booksReviews",
      Icon: MdOutlineReviews,
      iconLabel: "Book Reviews",
      title: "Book Reviews",
      description: "Dive into our captivating collection of books today!",
    },
    {
      href: "/subjects",
      Icon: Notebook,
      iconLabel: "Notes",
      title: "Notes",
      description: "Dive into our captivating collection of books today!",
    },
    {
      href: "/blogs",
      Icon: BsNewspaper,
      iconLabel: "Blogs",
      title: "Blogs",
      description: "Dive into our captivating collection of books today!",
    },
    {
      href: "/standalones?type=Article",
      Icon: Pen,
      iconLabel: "Articles",
      title: "Articles",
      description: "Dive into our captivating collection of books today!",
    },
    {
      href: "/texts",
      Icon: Text,
      iconLabel: "Text",
      title: "Text",
      description: "Dive into our captivating collection of books today!",
    },
  ];

  return (
    <section className="py-14 md:py-24 bg-brown-900 flex flex-col gap-16 items-center overlay-image">
      <BlurFade duration={0.5} inViewMargin="-72px" yOffset={18} inView>
        <h2 className="text-5xl sm:text-6xl font-semibold font-brand text-center text-transparent bg-clip-text bg-gradient-to-b from-themeSecondary to-[#A44200]">
          Literature at Your <br /> Finger Tips
        </h2>
      </BlurFade>

      <div className="grid grid-cols-1 min-[560px]:grid-cols-2 md:grid-cols-3 gap-6 mx-auto w-full max-w-6xl px-5">
        {features.map((feature, i) => (
          <FeatureCard
            href={feature.href}
            key={feature.title}
            Icon={feature.Icon}
            featureNumber={i + 1}
            title={feature.title}
            iconLabel={feature.iconLabel}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  );
};
