import { drive_v3, google } from "googleapis";

const authenticateGoogle = () => {
  const auth = new google.auth.GoogleAuth({
    keyFile: `src/data/litlang-820bb197c20a.json`,
    scopes: "https://www.googleapis.com/auth/drive",
  });
  return auth;
};

const auth = authenticateGoogle();

declare global {
  var googleDrive: drive_v3.Drive;
}

let googleDrive: drive_v3.Drive;

if (typeof window === "undefined") {
  if (process.env.NODE_ENV === "production") {
    googleDrive = google.drive({ version: "v3", auth });
  } else {
    if (!global.googleDrive) {
      global.googleDrive = google.drive({ version: "v3", auth });
    }

    googleDrive = global.googleDrive;
  }
}

//@ts-ignore
export default googleDrive;
