import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import ArtistStatement from "@/components/ArtistStatement";
import Commissions from "@/components/Commissions";
import Exhibitions from "@/components/Exhibitions";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Portfolio />
        <ArtistStatement />
        <Commissions />
        <Exhibitions />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
