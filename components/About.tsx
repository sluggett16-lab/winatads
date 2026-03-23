"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const credentials = [
  "Google Ads Certified",
  "Meta Blueprint Certified",
  "7+ Years Experience",
  "200+ Campaigns Managed",
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="py-24 md:py-32 bg-[#F8F8FC] px-6">
      <div className="max-w-7xl mx-auto">
        <div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* Text */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-[#FF2D55] font-semibold text-sm uppercase tracking-widest mb-4"
            >
              About
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold text-[#0F0E17] leading-tight mb-6"
            >
              Hi, I&apos;m Laura.
              <br />
              <span className="text-[#FF2D55]">I make ads win.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[#0F0E17]/60 text-lg leading-relaxed mb-6"
            >
              With 7+ years running paid media across every major platform, I&apos;ve
              managed millions in ad spend for healthcare practices, SaaS
              startups, and hospitality brands across Canada and the US.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-[#0F0E17]/60 text-lg leading-relaxed mb-8"
            >
              I built Win at Ads because most agencies talk a big game but
              optimize for their retainer, not your ROI. I do things differently
              — obsessively, transparently, and with your revenue as the only
              metric that matters.
            </motion.p>

            {/* Credentials */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-wrap gap-3"
            >
              {credentials.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center gap-2 bg-[#0F0E17]/5 border border-[#0F0E17]/10 text-[#0F0E17]/70 text-sm font-medium px-4 py-2 rounded-full"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF2D55]" />
                  {c}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Photo placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-[#0F0E17]/10">
              {/* Photo placeholder */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="w-24 h-24 rounded-full bg-[#FF2D55]/20 flex items-center justify-center">
                  <span className="text-4xl">👋</span>
                </div>
                <p className="text-[#0F0E17]/30 text-sm font-medium">
                  Photo coming soon
                </p>
              </div>
              {/* Decorative border */}
              <div className="absolute inset-0 rounded-3xl border-2 border-[#FF2D55]/20" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -left-6 bg-[#FF2D55] text-white rounded-2xl px-5 py-4 shadow-xl">
              <div className="text-2xl font-extrabold">4.2x</div>
              <div className="text-xs font-semibold opacity-80">Avg ROAS</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
