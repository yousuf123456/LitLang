"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BoxesCore = ({
  boxesClassName,
  staticColor,
  className,
  tileColor,
  noOfrows,
  noOfcols,
  ...rest
}: {
  boxesClassName?: string;
  staticColor?: boolean;
  tileColor?: string;
  className?: string;
  noOfrows?: number;
  noOfcols?: number;
}) => {
  const rows = new Array(noOfrows || 35).fill(1);
  const cols = new Array(noOfcols || 32).fill(1);

  let colors = [
    "--brown-100",
    "--brown-200",
    "--brown-500",
    "--brown-700",
    "--brown-300",
    "--amber-200",
    "--amber-300",
    "--amber-100",
    "--amber-400",
  ];

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div
      style={{
        transform: `translate(-40%,-60%) skewX(-30deg) skewY(10deg) scale(0.675) rotate(0deg) translateZ(0)`,
      }}
      className={cn(
        "absolute left-1/4 p-4 -top-1/4 flex  -translate-x-1/2 -translate-y-1/2 w-full h-full z-0",
        className
      )}
      {...rest}
    >
      {rows.map((_, i) => (
        <div
          key={`row` + i}
          className={cn(
            "w-20 h-10  border-l  border-[#FFECD1]/50 relative",
            boxesClassName
          )}
        >
          {cols.map((_, j) => (
            <motion.div
              whileHover={{
                ...(!staticColor
                  ? { backgroundColor: `var(${getRandomColor()})` }
                  : {}),
                transition: { duration: 0 },
              }}
              animate={{
                transition: { duration: 2 },
              }}
              key={`col` + j}
              className={cn(
                "w-20 h-10  border-r border-t border-[#FFECD1]/50 relative",
                boxesClassName
              )}
            >
              {j % 2 === 0 && i % 2 === 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="absolute h-6 w-10 -top-[14px] -left-[22px] text-[#FFECD1]/50 stroke-[1px] pointer-events-none"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m6-6H6"
                  />
                </svg>
              ) : null}
            </motion.div>
          ))}
        </div>
      ))}
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);
