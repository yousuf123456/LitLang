import { Heading } from "@/components/Heading";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { BlogsList } from "./BlogsList";

export const Blogs = () => {
  return (
    <MaxWidthWrapper className="mt-14 md:mt-20 flex flex-col gap-8 px-3 sm:px-8 lg:px-16">
      <div className="w-full flex flex-col items-center gap-2 md:gap-3">
        <Heading>Our Blogs</Heading>

        <p className="text-zinc-500 max-w-lg text-center text-sm md:text-base">
          Explore expert opinions in our diverse range of engaging blogs where
          knowledge meets inspiration!
        </p>
      </div>

      <div className="flex min-[480px]:flex-row flex-col items-center gap-3 md:gap-6">
        <Input
          className="w-full max-[480px]:order-2"
          placeholder="Search for blogs here"
        />
        <Select>
          <SelectTrigger className="min-[480px]:w-32 md:w-48 ">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort By</SelectLabel>
              <SelectItem value="apple">Newly Published</SelectItem>
              <SelectItem value="banana">Old Published</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <BlogsList />
    </MaxWidthWrapper>
  );
};
