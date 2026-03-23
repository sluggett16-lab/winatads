import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import About from "@/components/About";
import Industries from "@/components/Industries";
import AgencyPartners from "@/components/AgencyPartners";
import CaseStudies from "@/components/CaseStudies";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Ticker />
      <Stats />
      <Services />
      <About />
      <Industries />
      <AgencyPartners />
      <CaseStudies />
      <FAQ />
      <ContactForm />
      <Footer />
    </>
  );
}
