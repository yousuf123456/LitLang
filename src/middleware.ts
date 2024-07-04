import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isBlogEditorPage = createRouteMatcher(["/blogEditor(.*)"]);

export default clerkMiddleware((auth, req) => {
  if (isBlogEditorPage(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
