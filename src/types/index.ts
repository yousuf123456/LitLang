import { blogs, Message, standaloneFile, subject } from "@prisma/client";

export type sortSearchParamType = `${string}-${string}`;

export type blogType = blogs & { paginationToken?: string };

export type ResourceMimeType = "PDF" | "Folder" | "Audio";

export type ResourceType = {
  resources: ResourceType[];
  isHandwritten?: Boolean;
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

export type ExtendedMessageType = Omit<Message, "createdAt"> & {
  createdAt: string;
  isAiWriting?: boolean;
  isAiThinking?: boolean;
};

export type PaginationSearchParams = {
  paginationToken?: string;
  sortBy?: string;
  query?: string;
  going?: string;
  page?: string;
};
