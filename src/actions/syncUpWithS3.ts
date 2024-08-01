// S3 Folder Structure

//For Subjects
// litlang2/ -> Litlang/ -> Universities/ -> UniversitySubjectsFolder/ -> SemestersFolders/ -> SubjectsFolders/ -> Here Subject Image and All Subject Files

//For Books
// litlang2/ -> Litlang/ -> Books/ -> BookFileFolder/ -> Here Book Image and Book pdf file

//For Articles
// litlang2/ -> Litlang/ -> Articles/ -> ArticleFileFolder/ -> Here Article Image and Book pdf file

//For Texts
// litlang2/ -> Litlang/ -> Texts/ -> TextFileFolder/ -> Here Text Image and Book pdf file

"use server";
import ObjectId from "bson-objectid";

import mime from "mime-types";
import aws_s3 from "@/app/utils/aws-s3";

import prisma from "@/app/utils/prismadb";
import { ResourceType, SubjectType } from "@/types";
import { standaloneFile } from "@prisma/client";
import { ListObjectsCommand } from "@aws-sdk/client-s3";

const universityShorts: { [key: string]: string } = {
  "National University of Modern Languages": "NUML",
};

export const syncUpWithS3 = async () => {
  let dbSubjects: Omit<SubjectType, "id">[] = [];

  const uniFolders = await listObjects("Litlang/Universities/");

  await Promise.all(
    (uniFolders || []).map(async (uniFolder) => {
      const uniSemesters = await listObjects(uniFolder.prefix);

      await Promise.all(
        (uniSemesters || []).map(async (uniSemester) => {
          const semesterSubjects = await listObjects(uniSemester.prefix);

          await Promise.all(
            (semesterSubjects || []).map(async (semesterSubject) => {
              const subjectResources = await listObjects(
                semesterSubject.prefix
              );

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
                initialResources: {
                  id: string;
                  key: string;
                  prefix: string;
                  name: string | undefined;
                  url: string;
                  mimeType: string;
                }[]
              ) {
                return await Promise.all(
                  //@ts-ignore
                  initialResources.map(async (resource) => {
                    if (resource.mimeType === "application/x-directory") {
                      const folderResources = await listObjects(
                        resource.prefix
                      );

                      //@ts-ignore
                      const mappedFolderResources = await fetchandMapResources(
                        folderResources
                      );

                      return {
                        type: "Folder",
                        id: resource.id,
                        name: resource.name || "Untitled",
                        resources: mappedFolderResources,
                        isPremium: (resource.name || "").includes("(P)"),
                      };
                    }

                    return {
                      resources: [],
                      key: resource.key,
                      id: resource.id || "No Id",
                      name: resource.name || "Untitled",
                      isPremium: (resource.name || "").includes("(P)"),
                      type:
                        resource.mimeType === "application/pdf"
                          ? "PDF"
                          : "Audio",
                    } as ResourceType;
                  })
                );
              }

              //               // Resources without subject image
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
                imageUrl: subjectImage?.url || "",
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
  );

  await prisma.subject.deleteMany();
  const existingDBSubjects = await prisma.subject.findMany();

  await Promise.all(
    dbSubjects.map(async (dbSubject) => {
      const subjectAlreadyExisting = existingDBSubjects.filter(
        (existingSubj) =>
          existingSubj.university === dbSubject.university &&
          existingSubj.semester === dbSubject.semester &&
          existingSubj.name === dbSubject.name
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

  let dbStandalones: Omit<standaloneFile, "id" | "createdAt" | "updatedAt">[] =
    [];

  const booksFolders = await listObjects("Litlang/Books/");

  await Promise.all(
    (booksFolders || []).map(async (folder) => {
      const bookFiles = await listObjects(folder.prefix);

      const bookImage = (bookFiles || []).filter(
        (bookFile) =>
          bookFile.mimeType === "image/jpeg" ||
          bookFile.mimeType === "image/png" ||
          bookFile.mimeType === "image/gif" ||
          bookFile.mimeType === "image/bmp" ||
          bookFile.mimeType === "image/tiff" ||
          bookFile.mimeType === "image/webp" ||
          bookFile.mimeType === "image/svg+xml"
      )[0];

      const pdfFile = (bookFiles || []).filter(
        (bookFile) => bookFile.mimeType === "application/pdf"
      )[0];

      dbStandalones.push({
        type: "Book",
        name: folder.name || "Untitled",
        imageUrl:
          bookImage?.url ||
          "https://litlang2.s3.amazonaws.com/Litlang/Books/100 mistakes that changed history backfires and blunders that collapsed empires, crashed economies, and altered the course of our world by Bill Fawcett/WhatsApp Image 2024-07-20 at 2.48.33 PM.jpeg",
        pdfKey: pdfFile.key,
      });
    })
  );

  const articlesFolders = await listObjects("Litlang/Articles/");

  await Promise.all(
    (articlesFolders || []).map(async (folder) => {
      const articleFiles = await listObjects(folder.prefix);

      const bookImage = (articleFiles || []).filter(
        (articleFiles) =>
          articleFiles.mimeType === "image/jpeg" ||
          articleFiles.mimeType === "image/png" ||
          articleFiles.mimeType === "image/gif" ||
          articleFiles.mimeType === "image/bmp" ||
          articleFiles.mimeType === "image/tiff" ||
          articleFiles.mimeType === "image/webp" ||
          articleFiles.mimeType === "image/svg+xml"
      )[0];

      const pdfFile = (articleFiles || []).filter(
        (articleFiles) => articleFiles.mimeType === "application/pdf"
      )[0];

      dbStandalones.push({
        type: "Article",
        name: folder.name || "Untitled",
        imageUrl:
          bookImage?.url ||
          "https://litlang2.s3.amazonaws.com/Litlang/Books/100 mistakes that changed history backfires and blunders that collapsed empires, crashed economies, and altered the course of our world by Bill Fawcett/WhatsApp Image 2024-07-20 at 2.48.33 PM.jpeg",
        pdfKey: pdfFile.key,
      });
    })
  );

  const textsFolders = await listObjects("Litlang/Texts/");

  await Promise.all(
    (textsFolders || []).map(async (folder) => {
      const textFiles = await listObjects(folder.prefix);

      const textImage = (textFiles || []).filter(
        (textFile) =>
          textFile.mimeType === "image/jpeg" ||
          textFile.mimeType === "image/png" ||
          textFile.mimeType === "image/gif" ||
          textFile.mimeType === "image/bmp" ||
          textFile.mimeType === "image/tiff" ||
          textFile.mimeType === "image/webp" ||
          textFile.mimeType === "image/svg+xml"
      )[0];

      const pdfFile = (textFiles || []).filter(
        (textFile) => textFile.mimeType === "application/pdf"
      )[0];

      dbStandalones.push({
        type: "Text",
        name: folder.name || "Untitled",
        imageUrl:
          textImage?.url ||
          "https://litlang2.s3.amazonaws.com/Litlang/Books/100 mistakes that changed history backfires and blunders that collapsed empires, crashed economies, and altered the course of our world by Bill Fawcett/WhatsApp Image 2024-07-20 at 2.48.33 PM.jpeg",
        pdfKey: pdfFile.key,
      });
    })
  );

  await prisma.standaloneFile.deleteMany();
  const existingDBStandalones = await prisma.standaloneFile.findMany();

  await Promise.all(
    dbStandalones.map(async (dbStandalone) => {
      const standaloneAlreadyExisting = existingDBStandalones.filter(
        (existingBook) => existingBook.pdfKey === dbStandalone.pdfKey
      );

      if (standaloneAlreadyExisting.length > 0) {
        return await prisma.standaloneFile.update({
          where: { id: standaloneAlreadyExisting[0].id },
          data: dbStandalone,
        });
      } else {
        return await prisma.standaloneFile.create({
          data: dbStandalone,
        });
      }
    })
  );

  console.log("Synced with drive");
};

const listObjects = async (prefix: string) => {
  const params = {
    Bucket: "litlang2",
    Prefix: prefix,
    Delimiter: "/",
  };

  try {
    const data = await aws_s3.send(new ListObjectsCommand(params));

    // Folders will be in CommonPrefixes
    const folders = (data.CommonPrefixes || []).map((prefixObj) => ({
      key: prefixObj.Prefix!,
      prefix: prefixObj.Prefix!,
      id: ObjectId().toHexString(),
      name: (prefixObj.Prefix || "").split("/").slice(-2, -1)[0], // Extract folder name
      url: `https://litlang2.s3.amazonaws.com/${prefixObj.Prefix}`,
      mimeType: "application/x-directory",
    }));

    // Files will be in Contents
    const files = (data.Contents || [])
      .filter((contentObj) => contentObj.Key !== prefix)
      .map((contentObj) => ({
        key: contentObj.Key!,
        prefix: contentObj.Key!,
        id: ObjectId().toHexString(),
        name: (contentObj.Key || "").split("/").pop(), // Extract file name
        url: `https://litlang2.s3.amazonaws.com/${contentObj.Key}`,
        mimeType:
          mime.lookup(contentObj.Key || "") || "application/octet-stream", // Simple mimeType determination by file extension
      }));

    // Filter out the prefix itself if it exists in files
    const filteredFiles = files.filter((file) => file.prefix !== prefix);

    const combinedResources = [...folders, ...filteredFiles];

    return combinedResources;
  } catch (err) {
    console.error("Error listing objects from S3:", err);
    throw err;
  }
};
