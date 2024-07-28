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
    <div className="flex flex-col gap-3 items-center z-10 px-4">
      <h1
        className={cn(
          "text-5xl md:text-6xl font-semibold text-themeSecondary font-brand text-center",
          className
        )}
      >
        {children}
      </h1>

      {subHeading && (
        <p className="text-themeSecondary max-w-lg text-center text-base md:text-lg font-secondary">
          {subHeading}
        </p>
      )}
    </div>
  );
};
