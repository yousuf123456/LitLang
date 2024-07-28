import { cn } from "@/lib/utils";
import React from "react";

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "text-white bg-gradient-to-br from-gray-900 to-primary via-gray-800 rounded-lg px-6 py-1",
        className
      )}
    >
      {children}
    </span>
  );
};
