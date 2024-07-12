import { type ClassValue, clsx } from "clsx";
import { ReadonlyURLSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string, fullPath?: boolean) {
  if (typeof window !== "undefined" && !fullPath) return path;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}${path}`;
  return `http://localhost:${process.env.PORT ?? 3000}${path}`;
}

export function paymobApiUrl(path: string) {
  return `https://pakistan.paymob.com${path}`;
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

export const scrollToElement = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    const topOffset = 0; // Adjust this value for your desired top margin
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.screenY - topOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};

export function createImageUrlFromWebViewLink(webViewLink: string) {
  const fileId = webViewLink.split("/d/")[1]?.split("/")[0];
  return fileId
    ? `https://drive.google.com/uc?export=view&id=${fileId}`
    : webViewLink;
}
