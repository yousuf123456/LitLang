import { cn } from "@/lib/utils";
import React from "react";

export const Heading = ({
  children,
  className,
  subHeading,
}: {
  className?: string;
  subHeading?: string;
  children: React.ReactNode;
}) => {
  return (
    <>
      <h1
        className={cn(
          "text-3xl md:text-4xl font-semibold text-gray-800",
          className
        )}
      >
        {children}
      </h1>

      {subHeading && (
        <p className="text-zinc-500 max-w-lg text-center text-sm md:text-base">
          {subHeading}
        </p>
      )}
    </>
  );
};
