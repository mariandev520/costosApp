import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Solution } from "@/components/Solution";
import { AIFeature } from "@/components/AIFeature";
import { Recipes } from "@/components/Recipes";
import { Stock } from "@/components/Stock";
import { Benefits } from "@/components/Benefits";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="page">
      <Header />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <AIFeature />
        <Recipes />
        <Stock />
        <Benefits />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
