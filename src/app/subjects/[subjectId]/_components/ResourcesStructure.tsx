"use client";
import React, { useState } from "react";

import Link from "next/link";
import { ResourceType } from "@/types";
import {
  ChevronRight,
  Folder,
  Lock,
  LucideProps,
  Mic,
  Mic2,
} from "lucide-react";

import { AiFillAudio, AiFillFilePdf, AiOutlineFilePdf } from "react-icons/ai";
import { FaMicrophone } from "react-icons/fa";

import { cn } from "@/utils/utils";

import { LazyMotion, m } from "framer-motion";
import { IconType } from "react-icons/lib";
const loadFeatures = () =>
  import("@/app/utils/features").then((res) => res.default);

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
        role="tree"
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
            return resource.isPremium ? (
              <File
                isPremium={!!resource.isPremium}
                paddingLeft={paddingLeft}
                name={resource.name}
                Icon={AiFillFilePdf}
                key={i}
              />
            ) : (
              <Link key={i} href={`/subjects/${subjectId}/${resource.id}`}>
                <File
                  isPremium={!!resource.isPremium}
                  paddingLeft={paddingLeft}
                  Icon={AiOutlineFilePdf}
                  name={resource.name}
                />
              </Link>
            );
          else if (resource.type === "Audio") {
            return (
              <Link key={i} href={`/subjects/${subjectId}/${resource.id}`}>
                <File
                  paddingLeft={paddingLeft}
                  name={resource.name}
                  Icon={FaMicrophone}
                  isPremium
                />
              </Link>
            );
          } else return null;
        })}
      </m.ul>
    </LazyMotion>
  );
};

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
    <li
      className="flex flex-col"
      role="treeitem"
      aria-expanded={isChildsCollapsed}
    >
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

const File = ({
  paddingLeft,
  isPremium,
  Icon,
  name,
}: {
  Icon:
    | IconType
    | React.ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
      >;
  paddingLeft: number;
  isPremium: boolean;
  name: string;
}) => {
  return (
    <li
      role="treeitem"
      style={{ paddingLeft: paddingLeft + 4 }}
      className={cn(
        "flex items-center gap-2 py-3 pr-3 hover:bg-zinc-200/40 transition-colors",
        isPremium && " opacity-[0.85] pointer-events-none"
      )}
    >
      {isPremium ? (
        <Icon className="text-brown-600  w-[18px] h-[18px] flex-shrink-0" />
      ) : (
        <Icon className="text-zinc-500 w-[18px] h-[18px] flex-shrink-0" />
      )}

      <p
        className={cn(
          "text-zinc-900 text-sm line-clamp-1 flex-1",
          isPremium &&
            "text-transparent bg-clip-text bg-gradient-to-r from-brown-900 via-amber-800 to-brown-900 font-medium"
        )}
      >
        {name}
      </p>
      {isPremium && <Lock className="w-[14px] h-[14px] text-zinc-600" />}
    </li>
  );
};
