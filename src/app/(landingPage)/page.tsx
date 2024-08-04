import { Features } from "./_components/Features";
import { ParallaxRevampedHero } from "./_components/Hero";
import { Pricing } from "./_components/Pricing";
import { RevampedPublisherCTA } from "./_components/PublisherCTA";
// import { Universities } from "./_components/Universities";
import { Subjects } from "./_components/Subjects";

export default function Home() {
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
