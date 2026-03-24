"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const cases = [
  {
    industry: "Healthcare",
    client: "Telehealth provider",
    challenge: "Paid campaigns driving traffic but booking costs were too high to scale profitably.",
    results: [
      { metric: "Conversion Rate", before: "25%", after: "35%" },
      { metric: "Cost Per Booking", before: "$10", after: "$3" },
      { metric: "Ad Spend", before: "Same", after: "Same" },
    ],
    timeframe: "Same spend",
    color: "#FF2D55",
  },
  {
    industry: "SaaS",
    client: "B2B software platform",
    challenge: "Top-of-funnel campaigns weren't converting — leads were dropping off before purchase.",
    results: [
      { metric: "Conversions", before: "Baseline", after: "+40%" },
      { metric: "Strategy", before: "Top-funnel only", after: "Mid-funnel" },
      { metric: "Pipeline Quality", before: "Low", after: "High" },
    ],
    timeframe: "Post-launch",
    color: "#6C63FF",
  },
  {
    industry: "Hospitality",
    client: "Hotel & resort",
    challenge: "Paid search was running but return on ad spend was too low to justify scaling.",
    results: [
      { metric: "ROAS", before: "5x", after: "20x" },
      { metric: "Channel", before: "Paid Search", after: "Paid Search" },
      { metric: "Result", before: "Underperforming", after: "Scaled" },
    ],
    timeframe: "Paid search",
    color: "#F39C12",
  },
];

export default function CaseStudies() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="case-studies" className="py-24 md:py-32 bg-[#0F0E17] px-6">
      <div className="max-w-7xl mx-auto">
        <div ref={ref}>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[#FF2D55] font-semibold text-sm uppercase tracking-widest mb-4"
          >
            Case Studies
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16"
          >
            <div>
              <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight max-w-2xl">
                Real campaigns.
                <span className="text-[#FF2D55]"> Real numbers.</span>
              </h2>
              <p className="text-white/30 text-sm mt-2">These numbers are wild. We know.</p>
            </div>
            <p className="text-white/40 text-sm max-w-xs">
              Real results. Same principles applied to your account.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <motion.div
              key={c.industry}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              className="group relative bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300"
            >
              {/* Top accent bar */}
              <div className="h-1 w-full" style={{ backgroundColor: c.color }} />

              <div className="p-7">
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                    style={{ backgroundColor: `${c.color}20`, color: c.color }}
                  >
                    {c.industry}
                  </span>
                  <span className="text-white/30 text-xs">{c.timeframe}</span>
                </div>

                <p className="text-white/60 text-sm mb-6 leading-relaxed">
                  &ldquo;{c.challenge}&rdquo;
                </p>

                {/* Before/After table */}
                <div className="space-y-3">
                  <div className="grid grid-cols-3 text-xs font-bold uppercase tracking-wider text-white/30 pb-2 border-b border-white/[0.06]">
                    <span>Metric</span>
                    <span className="text-center">Before</span>
                    <span className="text-center" style={{ color: c.color }}>After</span>
                  </div>
                  {c.results.map((r) => (
                    <div key={r.metric} className="grid grid-cols-3 text-sm">
                      <span className="text-white/50">{r.metric}</span>
                      <span className="text-center text-white/30 line-through">
                        {r.before}
                      </span>
                      <span
                        className="text-center font-bold"
                        style={{ color: c.color }}
                      >
                        {r.after}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
