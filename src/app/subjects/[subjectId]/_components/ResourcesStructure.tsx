"use client";
import React, { useState } from "react";

import Link from "next/link";
import { ResourceType } from "@/types";
import { ChevronRight, Folder, Lock, LucideProps } from "lucide-react";

import { AiFillAudio, AiFillFilePdf, AiOutlineFilePdf } from "react-icons/ai";
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
              <Link key={i} href={`/subjects/${subjectId}/${resource.id}`}>
                <File
                  paddingLeft={paddingLeft}
                  name={resource.name}
                  Icon={FaMicrophone}
                  setOpen={setOpen}
                  open={open}
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
        "flex items-center gap-2 py-3 pr-3 hover:bg-zinc-200/40 transition-colors",
        isPremium && "opacity-[0.85]"
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
