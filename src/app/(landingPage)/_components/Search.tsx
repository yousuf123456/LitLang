import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import React from "react";

export const Search = ({}) => {
  return (
    <div className="w-full max-w-md relative">
      <Input className="w-full" placeholder="Search"></Input>
      <SearchIcon className="absolute w-4 h-4 text-zinc-400 right-4 top-1/2 -translate-y-1/2 z-10" />
    </div>
  );
};
