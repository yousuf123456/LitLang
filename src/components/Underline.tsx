import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const Underline = ({
  className,
  children,
  width,
  height,
}: {
  className?: string;
  children: React.ReactNode;
  width?: number;
  height?: number;
}) => {
  return (
    <div className="relative">
      {children}

      <div
        className={cn(
          "absolute -left-6 -right-6 -bottom-2 sm:-bottom-3 h-1",
          className
        )}
      >
        <Image
          alt="Underline SVG"
          className=" fill-primary w-full"
          src={"/underline.svg"}
          width={width}
          height={height}
          fill={!width && !height}
        />
      </div>
    </div>
  );
};
