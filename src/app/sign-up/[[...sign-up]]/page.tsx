import { PaddingTopWrapper } from "@/components/PaddingTopWrapper";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <PaddingTopWrapper>
      <div className="flex w-full h-[calc(100vh-72px)] justify-center items-center">
        <SignUp />
      </div>
    </PaddingTopWrapper>
  );
}
