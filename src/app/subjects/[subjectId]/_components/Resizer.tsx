"use client";
import { cn } from "@/utils/utils";
import React from "react";

export const Resizer = () => {
  const onMouseMove = (e: MouseEvent) => {
    if (!document) return;

    const sidebar = document.getElementById("sidebar");
    const width = e.clientX;

    if (!sidebar) return;

    sidebar.style.width = `${width}px`;
  };

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const onMouseUp = (e: MouseEvent) => {
    document.removeEventListener("mouseup", onMouseUp);
    document.removeEventListener("mousemove", onMouseMove);
  };

  return (
    <div
      role="separator"
      aria-orientation="vertical"
      aria-label="Sidebar resizer"
      onMouseDown={onMouseDown}
      className={cn(
        "absolute right-0 top-0 bottom-0 w-[2px] bg-themeSecondary opacity-100 hidden md:block z-40",
        "cursor-col-resize"
      )}
    />
  );
};
