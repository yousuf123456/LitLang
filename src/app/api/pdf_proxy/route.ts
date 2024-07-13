import googleDrive from "@/app/utils/googleDrive";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const fileId = searchParams.get("id");

  if (!fileId) return new NextResponse("No file ID provided", { status: 400 });

  try {
    const response = await googleDrive.files.get(
      { fileId, alt: "media" },
      { responseType: "arraybuffer" }
    );

    // const pdfBuffer = Buffer.from(response.data as ArrayBuffer);

    const u8intArray = new Uint8Array(response.data as ArrayBuffer);

    return NextResponse.json(u8intArray, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="document.pdf"',
      },
    });
  } catch (e: any) {
    console.log(e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
