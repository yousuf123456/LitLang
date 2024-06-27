import React from "react";
import Image from "next/image";

export const Underline = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative">
      {children}

      <div className="absolute -left-6 -right-6 -bottom-2 sm:-bottom-3 h-1">
        <Image
          alt="Underline SVG"
          className=" fill-primary w-full"
          src={"/underline.svg"}
          fill
        />
      </div>
    </div>
  );
};
