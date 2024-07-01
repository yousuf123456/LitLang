import { Badge } from "@/components/ui/badge";
import { blogs } from "@prisma/client";
import { HiArrowRight } from "react-icons/hi";
import Image from "next/image";
import React from "react";

export const BlogCard = ({ blog }: { blog: blogs }) => {
  return (
    <div className="w-full h-full rounded-xl bg-zinc-50 border border-zinc-200 p-2 flex flex-col gap-4 group cursor-pointer">
      <div className="w-full h-[70%] bg-white border border-zinc-200 rounded-xl p-2 transition-all group-hover:p-0">
        <div className="rounded-xl relative w-full h-full overflow-hidden">
          <Image
            alt="Blog Cover Image"
            src={blog.coverImage!}
            className="object-cover"
            fill
          />
        </div>
      </div>

      <div className="p-2 flex items-start gap-2">
        <p className="text-base text-zinc-700 font-medium line-clamp-2 text-start">
          {blog.title}
        </p>

        <Badge className="bg-white text-zinc-700 border border-zinc-200 rounded-lg hover:bg-white pr-4">
          Read Blog{" "}
          <HiArrowRight className="w-3 h-3  ml-3 group-hover:translate-x-2 transition-transform" />
        </Badge>
      </div>
    </div>
  );
};
