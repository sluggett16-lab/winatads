"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const industries = [
  {
    icon: "🏥",
    name: "Healthcare",
    tagline: "Turn ad clicks into booked appointments.",
    points: [
      "Ads that bring in new patients — not just clicks",
      "Local & multi-location campaign targeting",
      "Tracking set up so you know which ads book appointments",
      "Campaigns built around your slow seasons and busy periods",
    ],
  },
  {
    icon: "💻",
    name: "SaaS",
    tagline: "More trials, demos, and paying customers.",
    points: [
      "Campaigns built to drive signups and demo requests",
      "Retargeting people who visited but didn't convert",
      "Targeted B2B ads that reach the right decision-makers",
      "Clear reporting on what's actually driving new customers",
    ],
  },
  {
    icon: "🏨",
    name: "Hospitality",
    tagline: "More direct bookings. Less commission to OTAs.",
    points: [
      "Paid search campaigns that fill rooms directly",
      "Seasonal strategies for your busy and slow periods",
      "Geo-targeted ads to reach travelers before they book",
      "Packages and upsells promoted to the right audience",
    ],
  },
];

export default function Industries() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="industries" className="py-24 md:py-32 bg-[#0F0E17] px-6">
      <div className="max-w-7xl mx-auto">
        <div ref={ref}>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[#FF2D55] font-semibold text-sm uppercase tracking-widest mb-4"
          >
            Industries We Serve
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold text-white leading-tight max-w-3xl mb-16"
          >
            Industries I know
            <br />
            <span className="text-[#FF2D55]">inside and out.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {industries.map((industry, i) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              className="group relative bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 hover:border-[#FF2D55]/30 transition-all duration-300 hover:bg-white/[0.05] overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF2D55] opacity-0 group-hover:opacity-[0.04] rounded-full blur-2xl transition-opacity duration-300 -translate-y-8 translate-x-8" />
              <div className="text-5xl mb-5">{industry.icon}</div>
              <h3 className="text-2xl font-extrabold text-white mb-2">
                {industry.name}
              </h3>
              <p className="text-[#FF2D55] font-semibold text-sm mb-5">
                {industry.tagline}
              </p>
              <ul className="space-y-2.5">
                {industry.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 text-sm text-white/50"
                  >
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#FF2D55] shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
