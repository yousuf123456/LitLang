import { ResourceType } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { ReadonlyURLSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string, fullPath?: boolean) {
  if (typeof window !== "undefined" && !fullPath) return path;
  if (process.env.NODE_ENV === "production")
    return `https://${process.env.VERCEL_URL}${path}`;
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
  return results.map((result) => {
    const mongoId = result._id;
    const mongoCreatedAt = result.createdAt;
    const mongoUpdatedAt = result.createdAt;

    delete result._id;
    delete result.createdAt;
    delete result.updatedAt;

    return {
      ...result,
      id: mongoId.$oid,
      ...(mongoCreatedAt ? { createdAt: mongoCreatedAt.$date } : {}),
      ...(mongoUpdatedAt ? { updatedAt: mongoUpdatedAt.$date } : {}),
    };
  });
}

export const scrollToElement = (elementId: string, topOffset?: number) => {
  const element = document.getElementById(elementId);

  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - (topOffset || 0);

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

export const findFileById = (
  resources: ResourceType[] | undefined | null,
  id: string
): ResourceType | null => {
  if (!resources) return null;

  for (const resource of resources) {
    if (resource.type !== "Folder" && resource.id === id) {
      return resource;
    } else {
      const found = findFileById(resource.resources, id);

      if (found) {
        return found;
      }
    }
  }

  return null;
};
