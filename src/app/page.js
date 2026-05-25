import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Dealers from '@/components/Dealers';
import Products from '@/components/Products';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Dealers />
      <Products />
      <Contact />
    </main>
  );
}
