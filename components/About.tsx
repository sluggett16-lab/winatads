"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const credentials = [
  "Google Ads Certified",
  "7+ Years Experience",
  "200+ Campaigns Managed",
  "Canada & USA",
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
              I&apos;ve spent 7+ years in the weeds of paid media — managing campaigns
              for local healthcare clinics, scrappy SaaS startups, and boutique hotels
              across Canada and the US. Big budgets, small budgets — I&apos;ve worked with them all.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-[#0F0E17]/60 text-lg leading-relaxed mb-6"
            >
              Yes, it&apos;s just me. That&apos;s the point. When you work with Win at Ads,
              you&apos;re not handed off to a junior account manager — you get me,
              personally, in your accounts every day.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-[#0F0E17]/60 text-lg leading-relaxed mb-8"
            >
              I built Win at Ads because small and medium businesses deserve the same
              quality of paid media as the big brands — without the agency markup, the
              account manager shuffle, or the confusing monthly reports that tell you nothing.
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

          {/* Photo + decorative layout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex flex-col items-center gap-6"
          >
            {/* Photo — constrained width */}
            <div className="relative w-64 md:w-72 aspect-[3/4] rounded-3xl overflow-hidden bg-[#0F0E17]/10 shadow-xl mx-auto">
              <Image
                src="/laura.jpg"
                alt="Laura — Win at Ads founder"
                fill
                className="object-cover object-top"
                sizes="320px"
                priority
              />
              <div className="absolute inset-0 rounded-3xl border-2 border-[#FF2D55]/20 pointer-events-none" />
            </div>

            {/* Decorative dots below photo */}
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#FF2D55]/40" />
              <div className="flex gap-1.5">
                {[1,2,3,4,5].map((i) => (
                  <div
                    key={i}
                    className="rounded-full"
                    style={{
                      width: i === 3 ? 8 : i === 2 || i === 4 ? 6 : 4,
                      height: i === 3 ? 8 : i === 2 || i === 4 ? 6 : 4,
                      backgroundColor: i === 3 ? "#FF2D55" : i === 2 || i === 4 ? "#FF2D5580" : "#FF2D5530",
                    }}
                  />
                ))}
              </div>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#FF2D55]/40" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
