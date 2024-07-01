import { Features } from "./_components/Features";
import { Footer } from "./_components/Footer";
import { Hero } from "./_components/Hero";
import { PublisherCTA } from "./_components/PublisherCTA";
import { Universities } from "./_components/Universities";

export default function Home() {
  return (
    <main>
      <Hero />
      <Universities />
      <PublisherCTA />
      <Features />
      <Footer />
    </main>
  );
}
