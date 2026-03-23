"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Stats from "@/components/Stats";
import ROICalculator from "@/components/ROICalculator";
import Services from "@/components/Services";
import About from "@/components/About";
import Industries from "@/components/Industries";
import AgencyPartners from "@/components/AgencyPartners";
import CaseStudies from "@/components/CaseStudies";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import AuditQuiz from "@/components/AuditQuiz";

export default function Home() {
  const [quizOpen, setQuizOpen] = useState(false);

  useEffect(() => {
    const handler = () => setQuizOpen(true);
    window.addEventListener("open-audit-quiz", handler);
    return () => window.removeEventListener("open-audit-quiz", handler);
  }, []);

  return (
    <>
      <Nav />
      <Hero />
      <Ticker />
      <Stats />
      <ROICalculator />
      <Services />
      <About />
      <Industries />
      <AgencyPartners />
      <CaseStudies />
      <FAQ />
      <ContactForm />
      <Footer />
      <AnimatePresence>
        {quizOpen && <AuditQuiz onClose={() => setQuizOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
