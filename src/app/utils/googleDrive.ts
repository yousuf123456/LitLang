import { drive_v3 } from "@googleapis/drive";
import { GoogleAuth } from "google-auth-library";

const authenticate = () => {
  const auth = new GoogleAuth({
    keyFile: "src/data/litlang-820bb197c20a.json",
    scopes: "https://www.googleapis.com/auth/drive",
  });

  return auth;
};

let googleDrive = new drive_v3.Drive({ auth: authenticate() });

export default googleDrive;
