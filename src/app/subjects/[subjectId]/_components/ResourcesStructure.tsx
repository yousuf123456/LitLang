"use client";
import React, { useState } from "react";

import Link from "next/link";
import { ResourceType } from "@/types";
import { ChevronRight, Folder } from "lucide-react";
import { AiOutlineFilePdf } from "react-icons/ai";

import { cn } from "@/utils/utils";

import { AnimatePresence, LazyMotion, m } from "framer-motion";
const loadFeatures = () =>
  import("@/app/utils/features").then((res) => res.default);

const FolderStructure = ({
  resource,
  subjectId,
  paddingLeft,
}: {
  resource: ResourceType;
  paddingLeft: number;
  subjectId: string;
}) => {
  const [isChildsCollapsed, setIsChildsCollapsed] = useState(true);

  const toggleChildsCollapsed = () => setIsChildsCollapsed((prev) => !prev);

  return (
    <li className="flex flex-col">
      <div
        onClick={toggleChildsCollapsed}
        style={{ paddingLeft }}
        className={cn(
          "flex items-center gap-2 py-3 pr-3 hover:bg-zinc-200/40 transition-colors",
          !isChildsCollapsed && "bg-zinc-200/40"
        )}
      >
        <ChevronRight
          className={cn(
            "text-zinc-500 w-4 h-4 flex-shrink-0",
            !isChildsCollapsed && "rotate-90"
          )}
        />
        <Folder className="text-zinc-500 w-4 h-4 flex-shrink-0" />
        <p className="text-zinc-800 text-sm line-clamp-1">{resource.name}</p>
      </div>

      {!isChildsCollapsed && (
        <ResourcesStructure
          subjectId={subjectId}
          paddingLeft={paddingLeft + 8}
          resources={resource.resources}
        />
      )}
    </li>
  );
};

export const ResourcesStructure = ({
  resources,
  subjectId,
  paddingLeft,
}: {
  resources: ResourceType[];
  paddingLeft: number;
  subjectId: string;
}) => {
  return (
    <LazyMotion features={loadFeatures} strict>
      <m.ul
        animate={{ opacity: [0, 0.2, 0.5, 1], x: 0 }}
        initial={{ opacity: 0, x: 28 }}
        transition={{
          type: "keyframes",
          ease: "easeOut",
          duration: 0.35,
          delay: 0.1,
        }}
        className="flex flex-col"
      >
        {resources.map((resource, i) => {
          if (resource.type === "Folder")
            return (
              <FolderStructure
                key={i}
                resource={resource}
                subjectId={subjectId}
                paddingLeft={paddingLeft}
              />
            );
          else if (resource.type === "PDF")
            return (
              <Link key={i} href={`/subjects/${subjectId}/${resource.id}`}>
                <li
                  style={{ paddingLeft: paddingLeft + 4 }}
                  className="flex items-center gap-2 py-3 pr-3 hover:bg-zinc-200/40 transition-colors"
                >
                  <AiOutlineFilePdf className="text-zinc-500 w-[18px] h-[18px] flex-shrink-0" />
                  <p className="text-zinc-900 text-sm line-clamp-1">
                    {resource.name}
                  </p>
                </li>
              </Link>
            );
          else return null;
        })}
      </m.ul>
    </LazyMotion>
  );
};
