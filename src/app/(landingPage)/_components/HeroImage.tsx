import React from "react";
import { getImageProps } from "next/image";

export const HeroImage = ({
  images,
  priority,
}: {
  images: { [key in "tabs" | "desktop" | "mobiles"]?: string };
  priority?: boolean;
}) => {
  const commonPreload = {
    as: "image",
    rel: "preload",
    imageSizes: "100vw",
  };

  const common = {
    alt: "Hero Image",
    fill: true,
    priority: !!priority,
    sizes: "100vw",
    style: { objectFit: "cover" },
  } as any;

  const { srcSet: desktop } = getImageProps({
    ...common,
    src: images.desktop,
  }).props;

  const { srcSet: tab } = getImageProps({
    ...common,
    src: images.tabs,
  }).props;

  const { srcSet: mobile, ...rest } = getImageProps({
    ...common,
    src: images.mobiles,
  }).props;

  const tabMedia = `(min-width: 728px)`;
  const mobileMedia = `(max-width: 727px)`;
  const desktopMedia = images.tabs
    ? `(min-width: 1024px)`
    : `(min-width: 728px)`;

  return (
    <picture>
      {images.desktop && <source media={desktopMedia} srcSet={desktop} />}
      {images.mobiles && <source media={mobileMedia} srcSet={mobile} />}
      {images.mobiles && <source media={tabMedia} srcSet={tab} />}
      <img alt={"Hero Image"} {...rest} />
    </picture>
  );
};