import { cn } from "@/utils/utils";
import React from "react";

export const PaddingTopWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn("pt-[73px]", className)}>{children}</div>;
};
