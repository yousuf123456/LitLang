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
    "--brown-300",
    "--red-900",
    "--purple-700",
    "--yellow-600",
    "--orange-600",
    "--orange-400",
  ];
  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  function generateRandomBoolean() {
    // Adjust the probability here: trueProbability should be less than 0.5
    const trueProbability = 0.05; // Example: 20% chance of true

    return Math.random() < trueProbability;
  }

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
              // style={{
              //   ...(!staticColor
              //     ? j === clickedColIndex && i === clickedRowIndex
              //       ? { backgroundColor: `var(${getRandomColor()})` }
              //       : {}
              //     : generateRandomBoolean()
              //     ? { backgroundColor: tileColor }
              //     : {}),
              // }}

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
