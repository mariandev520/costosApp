import Navbar from '@/components/Navbar/Navbar';
import Hero from '@/components/Hero/Hero';
import PainPoints from '@/components/PainPoints/PainPoints';
import Features from '@/components/Features/Features';
import AIScanner from '@/components/AIScanner/AIScanner';
import Profitability from '@/components/Profitability/Profitability';
import WhyCoquinaria from '@/components/WhyCoquinaria/WhyCoquinaria';
import Pricing from '@/components/Pricing/Pricing';
import Footer from '@/components/Footer/Footer';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AIScanner />
        <PainPoints />
        <Features />
        <Profitability />
        {/* <WhyCoquinaria /> */}
        <Pricing />
      </main>
      <Footer />
    </>
  );
}
