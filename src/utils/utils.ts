import { type ClassValue, clsx } from "clsx";
import { ReadonlyURLSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  if (typeof window !== "undefined") return path;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}${path}`;
  return `http://localhost:${process.env.PORT ?? 3000}${path}`;
}

export function getSearchParamsArray(
  searchParams: ReadonlyURLSearchParams,
  searchParamsToAdd?: string[],
  searchParamsToRemove?: string[]
) {
  let searchParamsArray: string[] = [];

  Array.from(searchParams.entries()).forEach((searchParam) => {
    if (searchParamsToRemove?.includes(searchParam[0])) return;

    searchParamsArray.push(`${searchParam[0]}=${searchParam[1]}`);
  });

  searchParamsArray = [...searchParamsArray, ...(searchParamsToAdd || [])];

  return searchParamsArray;
}

export function getSortbyDirection(sortByDirStr: string) {
  return sortByDirStr === "desc" ? -1 : 1;
}

export function transformRawResultsToPrisma(results: any[]) {
  return results.map((result) => ({ ...result, id: result._id.$oid }));
}
