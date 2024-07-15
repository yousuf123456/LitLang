import { cache } from "react";

import googleDrive from "@/app/utils/googleDrive";

export const getFile = cache(async (fileId: string) => {
  return await googleDrive.files.get({
    alt: "media",
    fileId,
  });
});
