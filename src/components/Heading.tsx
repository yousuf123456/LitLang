import { cn } from "@/lib/utils";
import React from "react";

export const Heading = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={cn(
        "text-3xl md:text-4xl font-semibold text-gray-800",
        className
      )}
    >
      {children}
    </p>
  );
};