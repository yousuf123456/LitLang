import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isBlogEditorPage = createRouteMatcher(["/blogEditor(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  // console.log("Request Headers");
  // console.log("host:", req.headers.get("host"));
  // console.log("x-forwarded-host", req.headers.get("x-forwarded-host"));
  // console.log("x-forwarded-proto", req.headers.get("x-forwarded-proto"));
  // console.log("x-forwarded-proto", req.headers.get("x-forwarded-port"));
  // console.log("=========================");
  if (isBlogEditorPage(req)) await auth.protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
