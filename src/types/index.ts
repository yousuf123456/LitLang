import { blogs, subject } from "@prisma/client";

export type sortSearchParamType = `${string}-${string}`;

export type blogType = blogs & { paginationToken?: string };

export type ResourceMimeType = "PDF" | "Folder" | "Audio";

export type ResourceType = {
  resources: ResourceType[];
  type: ResourceMimeType;
  webViewLink?: string;
  isPremium?: Boolean;
  name: string;
  id: string;
};

export type SubjectType = subject & {
  resources: ResourceType[];
  paginationToken?: string;
};
