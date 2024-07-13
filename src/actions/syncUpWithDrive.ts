"use server";
import { drive_v3 } from "@googleapis/drive";

import googleDrive from "@/app/utils/googleDrive";
import prisma from "@/app/utils/prismadb";
import { ResourceType, SubjectType } from "@/types";

const universityShorts: { [key: string]: string } = {
  "National University of Modern Languages": "NUML",
};

export const syncUpWithDrive = async () => {
  let dbSubjects: Omit<SubjectType, "id">[] = [];

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
                          isPremium: (resource.name || "").includes("(P)"),
                        };
                      }

                      return {
                        isPremium: (resource.name || "").includes("(P)"),
                        webViewLink: resource.webViewLink,
                        name: resource.name || "Untitled",
                        id: resource.id || "No Id",
                        resources: [],
                        type: "PDF",
                      } as ResourceType;
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

                //@ts-ignore
                dbSubjects.push(dbSubject);
              })
            );
          })
        );
      })
    )
  );

  await prisma.subject.deleteMany();
  const existingDBSubjects = await prisma.subject.findMany();

  await Promise.all(
    dbSubjects.map(async (dbSubject) => {
      const subjectAlreadyExisting = existingDBSubjects.filter(
        (existingSubj) =>
          existingSubj.university === dbSubject.university &&
          existingSubj.name === dbSubject.name &&
          existingSubj.semester === dbSubject.semester
      );

      if (subjectAlreadyExisting.length > 0) {
        return await prisma.subject.update({
          where: { id: subjectAlreadyExisting[0].id },
          data: dbSubject as any,
        });
      } else {
        return await prisma.subject.create({
          data: dbSubject as any,
        });
      }
    })
  );

  console.log("Synced Subjects Successfully");
};
