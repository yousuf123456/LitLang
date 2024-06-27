import { Features } from "./_components/Features";
import { Footer } from "./_components/Footer";
import { Hero } from "./_components/Hero";
import { Navbar } from "./_components/Navbar";
import { Universities } from "./_components/Universities";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Universities />
      <Features />
      <Footer />
    </main>
  );
}
