import React, { ElementType, PropsWithChildren } from "react";
import { cn } from "@/utils/utils";

type WrapperProps<T extends ElementType> = {
  as?: T;
} & PropsWithChildren<React.ComponentPropsWithoutRef<T>>;

export const PaddingTopWrapper = <T extends ElementType = "div">({
  as,
  children,
  className,
  ...rest
}: WrapperProps<T>) => {
  const Tag = as || "div";

  return (
    <Tag className={cn("pt-[72.5px]", className)} {...rest}>
      {children}
    </Tag>
  );
};
