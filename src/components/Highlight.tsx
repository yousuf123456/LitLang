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
        "text-white bg-gradient-to-br from-gray-900 to-primary rounded-lg px-2 py-1",
        className
      )}
    >
      {children}
    </span>
  );
};
