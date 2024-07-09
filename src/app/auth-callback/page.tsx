"use client";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { trpc } from "../_trpc/client";
import { absoluteUrl } from "@/utils/utils";
import { truncate } from "fs";

export default function page() {
  const router = useRouter();
  const redirect = useSearchParams().get("redirect");

  const { isSuccess, isError, data, error } =
    trpc.authCallback.useQuery(undefined);

  useEffect(() => {
    if (isSuccess && data.success) {
      return redirect ? router.push(`/${redirect}`) : router.push("/");
    }

    // When the user is not logged in.
    if (isSuccess && !data.success) {
      return router.push(
        `/sign-in?sign_in_force_redirect_url=${absoluteUrl(
          "/auth-callback",
          true
        )}&sign_up_force_redirect_url=${absoluteUrl(
          "/auth-callback",
          true
        )}&redirect_url=${absoluteUrl("/auth-callback", true)}`
      );
    }
  }, [isSuccess, isError, error, data]);

  return (
    <div className="mt-48 flex-1 h-full w-full flex gap-5 justify-center items-center">
      <Loader2 className="animate-spin text-zinc-700 w-8 h-8" />
      <div className="flex flex-col">
        <p className="text-xl font-semibold text-zinc-600">
          Creating your account.
        </p>
        <p className=" text-zinc-600">You will be redirected automatically.</p>
      </div>
    </div>
  );
}
