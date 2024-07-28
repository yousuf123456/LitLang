import { cn } from "@/lib/utils";
import React from "react";

export const MaxWidthWrapper = ({
  id,
  children,
  className,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div id={id} className={cn("mx-auto max-w-screen-xl w-full", className)}>
      {children}
    </div>
  );
};
