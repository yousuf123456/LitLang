import { Features } from "./_components/Features";
import { Hero } from "./_components/Hero";
import { Pricing } from "./_components/Pricing";
import { PublisherCTA } from "./_components/PublisherCTA";
import { Universities } from "./_components/Universities";

export default function Home() {
  return (
    <div className="flex flex-col w-full gap-28 md:gap-44">
      <Hero />
      <Universities />
      <PublisherCTA />
      <Features />
      <Pricing />
    </div>
  );
}
