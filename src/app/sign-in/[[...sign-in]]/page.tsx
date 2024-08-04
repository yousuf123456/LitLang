import { PaddingTopWrapper } from "@/components/PaddingTopWrapper";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <PaddingTopWrapper>
      <div className="flex w-full h-[calc(100vh-72px)] items-center justify-center">
        <SignIn />
      </div>
    </PaddingTopWrapper>
  );
}
