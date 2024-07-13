import React from "react";

import { Resizer } from "./Resizer";
import { Text } from "lucide-react";
import { SubjectType } from "@/types";
import { ResourcesStructure } from "./ResourcesStructure";
import { cn, createImageUrlFromWebViewLink } from "@/utils/utils";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

export const Sidebar = ({
  subject,
  showSubject,
  className,
}: {
  showSubject?: boolean;
  subject: SubjectType;
  className?: string;
}) => {
  return (
    <aside
      id="sidebar"
      className={cn(
        "min-w-56 w-full md:w-64 lg:w-80 max-w-full md:max-w-96 bg-zinc-50 relative group overflow-x-hidden select-none",
        className
      )}
    >
      <Resizer />
      <ScrollArea className="h-full">
        <div
          className={cn("w-full block md:hidden", showSubject && "md:block")}
        >
          <div className="w-full h-44 relative">
            <Image
              src={createImageUrlFromWebViewLink(subject.imageUrl)}
              className="object-cover "
              alt="Subject Picture"
              fill
            />

            <div className="absolute inset-0 p-4 bg-black/50 z-10 flex flex-col justify-between">
              <p className="line-clamp-2 text-lg font-medium text-white">
                {subject.name}
              </p>

              <div className="w-full flex justify-end gap-4">
                <Badge
                  variant={"outline"}
                  className="text-xs text-zinc-200 font-medium rounded-lg "
                >
                  {subject.universityShort}
                </Badge>
                <Badge
                  variant={"outline"}
                  className="text-xs text-zinc-200 font-medium rounded-lg "
                >
                  Semester {subject.semester}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="py-8 flex flex-col gap-6">
          <div className="px-3 flex items-center gap-4">
            <Text className="w-5 h-5 text-zinc-700" />

            <h2 className="text-zinc-800 text-lg font-medium">Resources</h2>
          </div>

          {subject.resources.length === 0 && (
            <p className="mx-5 mt-8">
              We are working hard to provide material very soon for this
              subject.
            </p>
          )}

          <ResourcesStructure
            paddingLeft={8}
            subjectId={subject.id}
            resources={subject.resources}
          />
        </div>
      </ScrollArea>
    </aside>
  );
};
