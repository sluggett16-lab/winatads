"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const platforms = ["Google Ads", "Meta Ads", "TikTok Ads", "LinkedIn Ads", "Paid Search"];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % platforms.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0F0E17] px-6">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#F8F8FC 1px, transparent 1px), linear-gradient(90deg, #F8F8FC 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Pink glow blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-[#FF2D55] opacity-[0.06] blur-[120px] pointer-events-none" />

      {/* Content — always visible, no opacity:0 initial state */}
      <div className="relative z-10 text-center max-w-5xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-sm text-white/60 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF2D55] animate-pulse" />
          Results-obsessed paid media
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[1.05] tracking-tight mb-6">
          <span className="text-white">Your </span>
          <span className="relative inline-block min-w-[8rem] text-left">
            {mounted ? (
              <AnimatePresence mode="wait">
                <motion.span
                  key={platforms[index]}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -40, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="inline-block text-[#FF2D55] text-glow"
                >
                  {platforms[index]}
                </motion.span>
              </AnimatePresence>
            ) : (
              <span className="inline-block text-[#FF2D55] text-glow">
                {platforms[0]}
              </span>
            )}
          </span>
          <br />
          <span className="text-white">Should Be Winning.</span>
          <br />
          <span className="text-white/40">Are They?</span>
        </h1>

        {/* Subhead */}
        <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
          We manage high-performance paid ad campaigns for SMBs and agency
          partners. No fluff, no vanity metrics — just revenue.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 bg-[#FF2D55] hover:bg-[#CC2444] text-white font-bold px-8 py-4 rounded-full text-base transition-all duration-200 hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,45,85,0.3)]"
          >
            Get a Free Audit
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="#case-studies"
            className="inline-flex items-center gap-2 border border-white/20 hover:border-white/50 text-white/70 hover:text-white font-semibold px-8 py-4 rounded-full text-base transition-all duration-200"
          >
            See Results
          </a>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 text-xs">
          <span>Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </div>
    </section>
  );
}
