"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const benefits = [
  {
    icon: "🤝",
    title: "White-Label Services",
    desc: "Need paid media muscle without hiring in-house? We plug into your agency seamlessly — your brand, our execution.",
  },
  {
    icon: "📬",
    title: "Referral Partnerships",
    desc: "Send us a client, earn a referral fee. We protect your relationship and keep you in the loop throughout.",
  },
  {
    icon: "⚡",
    title: "Overflow & Surge Support",
    desc: "Seasonal surge? New client win? We scale up fast to handle overflow without the hiring overhead.",
  },
];

export default function AgencyPartners() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="partners"
      className="relative py-24 md:py-32 bg-[#F8F8FC] px-6 overflow-hidden"
    >
      {/* Decorative bg shape */}
      <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-[#FF2D55] opacity-[0.04] rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-[#FF2D55] font-semibold text-sm uppercase tracking-widest mb-4"
            >
              Agency Partners
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold text-[#0F0E17] leading-tight mb-6"
            >
              Run an agency?
              <br />
              <span className="text-[#FF2D55]">Let&apos;s build together.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[#0F0E17]/60 text-lg leading-relaxed mb-8"
            >
              Whether you need white-label paid media, overflow capacity, or a
              referral partner your clients will love — we work with agencies to
              deliver premium results without the overhead.
            </motion.p>
            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex items-center gap-2 bg-[#0F0E17] hover:bg-[#FF2D55] text-white font-bold px-7 py-4 rounded-full text-base transition-all duration-300 group"
            >
              Let&apos;s Talk Partnerships
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.a>
          </div>

          {/* Right: benefit cards */}
          <div className="flex flex-col gap-5">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                className="flex items-start gap-5 bg-white border border-[#0F0E17]/5 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-3xl shrink-0">{b.icon}</div>
                <div>
                  <h3 className="font-bold text-[#0F0E17] mb-1.5">{b.title}</h3>
                  <p className="text-sm text-[#0F0E17]/55 leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
