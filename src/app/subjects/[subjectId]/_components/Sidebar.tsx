"use client";
import React, { useState } from "react";

import Image from "next/image";
import { Resizer } from "./Resizer";
import { Gem, Text } from "lucide-react";
import { SubjectType } from "@/types";
import { Badge } from "@/components/ui/badge";
import { ResourcesStructure } from "./ResourcesStructure";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn, createImageUrlFromWebViewLink } from "@/utils/utils";

import { DialogContent, Dialog, DialogClose } from "@/components/ui/dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export const Sidebar = ({
  subject,
  showSubject,
  className,
}: {
  showSubject?: boolean;
  subject: SubjectType;
  className?: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <aside
        id="sidebar"
        className={cn(
          "min-w-56 w-full md:w-64 lg:w-80 max-w-full md:max-w-96 bg-zinc-50 relative group overflow-x-hidden select-none",
          className
        )}
      >
        <Resizer />

        <ScrollArea className="h-full">
          <section
            aria-label="Subject Information"
            className={cn("w-full block md:hidden", showSubject && "md:block")}
          >
            <div className="w-full h-44 relative">
              <Image
                src={createImageUrlFromWebViewLink(subject.imageUrl)}
                className="object-cover "
                alt="Subject Picture"
                priority={true}
                fill
              />

              <div className="absolute inset-0 p-4 bg-black/50 z-10 flex flex-col justify-between">
                <h1 className="line-clamp-2 text-lg font-medium text-white">
                  {subject.name}
                </h1>

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
          </section>

          <section
            aria-label="File explorer"
            className="py-8 flex flex-col gap-6"
          >
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
              open={open}
              paddingLeft={8}
              setOpen={setOpen}
              subjectId={subject.id}
              resources={subject.resources}
            />
          </section>
        </ScrollArea>
      </aside>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex flex-col gap-5">
          <div className="w-full flex justify-center">
            <div className="p-2.5 from-gray-900 bg-gradient-to-br to-primary hover:bg-gray-900/90 rounded-md">
              <Gem className="w-7 h-7 text-gray-100" />
            </div>
          </div>

          <h2 className="text-3xl font-[550] font-brand text-center text-gray-900 mt-4">
            You need premium plan to view this file!
          </h2>

          <p className="mb-8">
            Buy our premium plan now and get access to all the premium files
            today.
          </p>

          <DialogClose asChild>
            <Link
              href={"/?goTo=pricing"}
              className={buttonVariants({
                size: "lg",
                className:
                  "from-gray-900 bg-gradient-to-br to-primary hover:bg-gray-900/90",
              })}
            >
              Buy Premium Plan
            </Link>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
};
