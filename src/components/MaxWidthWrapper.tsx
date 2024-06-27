import { cn } from "@/lib/utils";
import React from "react";

export const MaxWidthWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("mx-auto max-w-screen-xl w-full", className)}>
      {children}
    </div>
  );
};
