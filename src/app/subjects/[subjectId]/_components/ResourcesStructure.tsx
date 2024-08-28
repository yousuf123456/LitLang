"use client";
import React, { useState } from "react";

import Link from "next/link";
import { ResourceType } from "@/types";
import { ChevronRight, Folder, Lock, LucideProps } from "lucide-react";

import { AiFillFilePdf, AiOutlineFilePdf } from "react-icons/ai";
import { FaMicrophone } from "react-icons/fa";

import { cn } from "@/utils/utils";

import { LazyMotion, m } from "framer-motion";
import { IconType } from "react-icons/lib";
const loadFeatures = () =>
  import("@/app/utils/features").then((res) => res.default);

export const ResourcesStructure = ({
  open,
  setOpen,
  resources,
  subjectId,
  paddingLeft,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  resources: ResourceType[];
  paddingLeft: number;
  subjectId: string;
  open: boolean;
}) => {
  return (
    <LazyMotion features={loadFeatures} strict>
      <m.ul
        animate={{ opacity: [0, 0.2, 0.5, 1], x: 0 }}
        initial={{ opacity: 0, x: 28 }}
        transition={{
          type: "keyframes",
          ease: "easeOut",
          duration: 0.3,
          delay: 0.3,
        }}
        role="tree"
        className="flex flex-col"
      >
        {resources.map((resource, i) => {
          if (resource.type === "Folder")
            return (
              <FolderStructure
                key={i}
                open={open}
                setOpen={setOpen}
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
                setOpen={setOpen}
                open={open}
                key={i}
              />
            ) : (
              <Link key={i} href={`/subjects/${subjectId}/${resource.id}`}>
                <File
                  isPremium={!!resource.isPremium}
                  paddingLeft={paddingLeft}
                  Icon={AiOutlineFilePdf}
                  name={resource.name}
                  setOpen={setOpen}
                  open={open}
                />
              </Link>
            );
          else if (resource.type === "Audio") {
            return (
              <File
                paddingLeft={paddingLeft}
                name={resource.name}
                Icon={FaMicrophone}
                setOpen={setOpen}
                open={open}
                isPremium
                key={i}
              />
            );
          } else return null;
        })}
      </m.ul>
    </LazyMotion>
  );
};

const FolderStructure = ({
  open,
  setOpen,
  resource,
  subjectId,
  paddingLeft,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  resource: ResourceType;
  paddingLeft: number;
  subjectId: string;
  open: boolean;
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
          "flex items-center gap-2 py-3 pr-3 hover:bg-[#DED8C4] transition-colors",
          !isChildsCollapsed && "bg-[#DED8C4]"
        )}
      >
        <ChevronRight
          className={cn(
            "text-zinc-500 w-4 h-4 flex-shrink-0",
            !isChildsCollapsed && "rotate-90"
          )}
        />
        <Folder className="text-zinc-600 w-4 h-4 flex-shrink-0" />
        <p className="text-zinc-900 font-medium text-sm line-clamp-1">
          {resource.name}
        </p>
      </div>

      {!isChildsCollapsed && (
        <ResourcesStructure
          open={open}
          setOpen={setOpen}
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
  setOpen,
  Icon,
  name,
  open,
}: {
  Icon:
    | IconType
    | React.ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
      >;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  paddingLeft: number;
  isPremium: boolean;
  open: boolean;
  name: string;
}) => {
  return (
    <li
      role="treeitem"
      onClick={() => {
        if (isPremium) setOpen(true);
      }}
      style={{ paddingLeft: paddingLeft + 4 }}
      className={cn(
        "max-w-full grid items-center gap-2 py-3 pr-3 hover:bg-[#DED8C4] transition-colors",
        isPremium && "opacity-[0.85] grid-cols-[auto_1fr_auto]",
        !isPremium && "grid-cols-[auto_1fr]"
      )}
    >
      {isPremium ? (
        <Icon className="text-primary w-4 h-4 flex-shrink-0" />
      ) : (
        <Icon className="text-zinc-600 w-4 h-4 flex-shrink-0" />
      )}

      <p
        className={cn(
          "text-zinc-900 text-sm line-clamp-1 text-ellipsis font-medium",
          isPremium &&
            "text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-700 to-primary font-medium"
        )}
      >
        {name}
      </p>

      {isPremium && (
        <Lock className="w-[14px] h-[14px] text-zinc-800 flex-shrink-0" />
      )}
    </li>
  );
};
