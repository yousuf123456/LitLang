import { drive_v3 } from "@googleapis/drive";
import { GoogleAuth } from "google-auth-library";

const authenticate = () => {
  const auth = new GoogleAuth({
    // keyFile: "src/data/litlang-820bb197c20a.json",
    scopes: "https://www.googleapis.com/auth/drive",
    credentials: {
      type: process.env.TYPE!,
      token_url: process.env.TOKEN_URI!,
      client_id: process.env.CLIENT_ID!,
      projectId: process.env.PROJECT_ID!,
      private_key: process.env.PRIVATE_KEY!,
      client_email: process.env.CLIENT_EMAIL!,
      private_key_id: process.env.PRIVATE_KEY_ID!,
      universe_domain: process.env.UNIVERSE_DOMAIN!,
    },
  });

  return auth;
};

let googleDrive = new drive_v3.Drive({ auth: authenticate() });

export default googleDrive;
