import React from "react";

import Image from "next/image";

import { createImageUrlFromWebViewLink } from "@/utils/utils";
import { Badge } from "@/components/ui/badge";
import { SubjectType } from "@/types";

export const SubjectCard = ({ subject }: { subject: SubjectType }) => {
  return (
    <article className="w-full h-full rounded-xl bg-zinc-50 hover:bg-white transition-colors border border-zinc-200 p-1.5 flex flex-col gap-2 group cursor-pointer z-20">
      <div className="w-full bg-white border border-zinc-200 rounded-xl p-1.5">
        <div className="rounded-xl relative w-full h-full overflow-hidden aspect-w-16 aspect-h-8 bg-zinc-50">
          <Image
            fill
            loading="lazy"
            className="object-cover"
            alt="subject Cover Image"
            src={createImageUrlFromWebViewLink(subject.imageUrl)}
          />
        </div>
      </div>

      <div className="p-2 flex flex-col items-end gap-2">
        <p className="text-base md:text-lg text-zinc-700 font-medium line-clamp-2 w-full text-start h-14">
          {subject.name}
        </p>

        <div className="flex items-center gap-3">
          <Badge className="bg-white text-sm font-medium text-zinc-600 border border-zinc-200 rounded-lg hover:bg-white">
            {subject.universityShort}
          </Badge>
          <Badge className="bg-white text-sm text-zinc-600 font-medium border border-zinc-200 rounded-lg hover:bg-white">
            Semester {subject.semester}
          </Badge>
        </div>
      </div>
    </article>
  );
};
