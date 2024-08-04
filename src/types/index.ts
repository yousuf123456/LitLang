import { blogs, standaloneFile, subject } from "@prisma/client";

export type sortSearchParamType = `${string}-${string}`;

export type blogType = blogs & { paginationToken?: string };

export type ResourceMimeType = "PDF" | "Folder" | "Audio";

export type ResourceType = {
  resources: ResourceType[];
  type: ResourceMimeType;
  isPremium?: Boolean;
  name: string;
  key?: string;
  id: string;
};

export type SubjectType = subject & {
  resources: ResourceType[];
  paginationToken?: string;
};

export type FullStandaloneFileType = standaloneFile & {
  book: standaloneFile | null;
  bookReviews: standaloneFile[];
};
