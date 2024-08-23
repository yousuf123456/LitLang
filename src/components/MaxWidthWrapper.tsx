import React, { ElementType, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type WrapperProps<T extends ElementType> = {
  as?: T;
} & PropsWithChildren<React.ComponentPropsWithoutRef<T>>;

export const MaxWidthWrapper = <T extends ElementType = "div">({
  as,
  children,
  className,
  ...rest
}: WrapperProps<T>) => {
  const Tag = as || "div";

  return (
    <Tag className={cn("mx-auto max-w-screen-xl w-full", className)} {...rest}>
      {children}
    </Tag>
  );
};
