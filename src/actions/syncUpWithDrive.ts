"use server";

import prisma from "@/app/utils/prismadb";

import { drive_v3 } from "@googleapis/drive";
import { Resource, subject } from "@prisma/client";
import { promises } from "dns";
import { GoogleAuth } from "google-auth-library";

const universityShorts: { [key: string]: string } = {
  "National University of Modern Languages": "NUML",
};

const authenticate = () => {
  const auth = new GoogleAuth({
    keyFile: "src/data/litlang-820bb197c20a.json",
    scopes: "https://www.googleapis.com/auth/drive",
  });

  return auth;
};

const googleDrive = new drive_v3.Drive({ auth: authenticate() });

export const syncUpWithDrive = async () => {
  let dbSubjects: Omit<subject, "id">[] = [];

  const uniFolders = (
    await googleDrive.files.list({
      q: "trashed = false and parents in '1OhuxwqnpsOgsgefnatHFN6aKaqXOr-lM'",
    })
  ).data.files;

  await Promise.all(
    await Promise.all(
      (uniFolders || []).map(async (uniFolder) => {
        const uniSemesters = (
          await googleDrive.files.list({
            q: `trashed = false and parents in '${uniFolder.id}'`,
          })
        ).data.files;

        await Promise.all(
          (uniSemesters || []).map(async (uniSemester) => {
            const semesterSubjects = (
              await googleDrive.files.list({
                q: `trashed = false and parents in '${uniSemester.id}'`,
              })
            ).data.files;

            await Promise.all(
              (semesterSubjects || []).map(async (semesterSubject) => {
                const subjectResources = (
                  await googleDrive.files.list({
                    q: `trashed = false and parents in '${semesterSubject.id}'`,
                    fields: "files(id, name, mimeType, webViewLink)",
                  })
                ).data.files;

                const subjectImage = (subjectResources || []).filter(
                  (subjectResource) =>
                    subjectResource.mimeType === "image/jpeg" ||
                    subjectResource.mimeType === "image/png" ||
                    subjectResource.mimeType === "image/gif" ||
                    subjectResource.mimeType === "image/bmp" ||
                    subjectResource.mimeType === "image/tiff" ||
                    subjectResource.mimeType === "image/webp" ||
                    subjectResource.mimeType === "image/svg+xml"
                )[0];

                //@ts-ignore
                async function fetchandMapResources(
                  initialResources: drive_v3.Schema$File[]
                ) {
                  return await Promise.all(
                    //@ts-ignore
                    initialResources.map(async (resource) => {
                      if (
                        resource.mimeType ===
                        "application/vnd.google-apps.folder"
                      ) {
                        const folderResources = (
                          await googleDrive.files.list({
                            q: `trashed = false and parents in '${resource.id}'`,
                            fields: "files(id, name, mimeType, webViewLink)",
                          })
                        ).data.files;

                        //@ts-ignore
                        const mappedFolderResources =
                          await fetchandMapResources(folderResources || []);

                        return {
                          type: "Folder",
                          webViewLink: null,
                          id: resource.id || "No Id",
                          name: resource.name || "Untitled",
                          resources: mappedFolderResources,
                        };
                      }

                      return {
                        webViewLink: resource.webViewLink,
                        name: resource.name || "Untitled",
                        id: resource.id || "No Id",
                        resources: [],
                        type: "PDF",
                      } as Resource;
                    })
                  );
                }

                // Resources without subject image
                const filteredSubjResources = (subjectResources || []).filter(
                  (subjectResource) =>
                    subjectResource.mimeType !== "image/jpeg" &&
                    subjectResource.mimeType !== "image/png" &&
                    subjectResource.mimeType !== "image/gif" &&
                    subjectResource.mimeType !== "image/bmp" &&
                    subjectResource.mimeType !== "image/tiff" &&
                    subjectResource.mimeType !== "image/webp" &&
                    subjectResource.mimeType !== "image/svg+xml"
                );

                const dbSubject = {
                  semester: parseInt(
                    (uniSemester.name || "Semester 1").split(" ")[1]
                  ),
                  universityShort: universityShorts[uniFolder.name || ""],
                  imageUrl: subjectImage?.webViewLink || "",
                  name: semesterSubject.name || "Untitled",
                  university: uniFolder.name || "Untitled",
                  resources: await fetchandMapResources(filteredSubjResources),
                };

                dbSubjects.push(dbSubject);
              })
            );
          })
        );
      })
    )
  );

  console.log(dbSubjects[0].resources);
};
