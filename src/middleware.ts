import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isBlogsPage = createRouteMatcher(["/blogs(.*)"]);
const isBlogEditorPage = createRouteMatcher(["/blogEditor(.*)"]);

export default clerkMiddleware(
  (auth, req) => {
    if (isBlogsPage(req) || isBlogEditorPage(req)) auth().protect();
  },
  { debug: true }
);

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
