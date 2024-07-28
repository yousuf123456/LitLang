import { S3Client } from "@aws-sdk/client-s3";

declare global {
  var aws_s3: S3Client | undefined;
}

let aws_s3: S3Client;

if (typeof window === "undefined") {
  if (process.env.NODE_ENV === "production") {
    aws_s3 = new S3Client({
      region: "ap-south-1",
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY!,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
      },
    });
  } else {
    if (!global.aws_s3) {
      global.aws_s3 = new S3Client({
        region: "ap-south-1",
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY!,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
        },
      });
    }

    aws_s3 = global.aws_s3;
  }
}

//@ts-ignore
export default aws_s3;
