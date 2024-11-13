import { Features } from "./_components/Features";
import { ParallaxRevampedHero } from "./_components/Hero";
import { Pricing } from "./_components/Pricing";
import { RevampedPublisherCTA } from "./_components/PublisherCTA";
import { Subjects } from "./_components/Subjects";

export default async function Home() {
  return (
    <div className="flex flex-col w-full ">
      <ParallaxRevampedHero />
      {/* <Universities /> */}
      <Subjects />
      <RevampedPublisherCTA />
      <Features />
      <Pricing />
    </div>
  );
}
