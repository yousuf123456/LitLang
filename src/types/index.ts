import { blogs } from "@prisma/client";

export type sortSearchParamType = `${string}-${string}`;

export type blogType = blogs & { paginationToken?: string };
