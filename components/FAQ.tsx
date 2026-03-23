"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "What makes Win at Ads different from other paid media agencies?",
    a: "Most agencies optimize for their own retainer renewal — we optimize for your revenue. We move fast, communicate clearly, and treat your budget like it's our own money on the line.",
  },
  {
    q: "Which ad platforms do you work with?",
    a: "We work across Google Ads (Search, Shopping, Display, YouTube), Meta (Facebook + Instagram), TikTok, LinkedIn, Pinterest, and Snapchat. Most clients focus on 2-3 platforms that make sense for their audience.",
  },
  {
    q: "What's the minimum budget to work with Win at Ads?",
    a: "We typically work with clients investing at least $3,000/month in ad spend. Below that, it's hard to gather enough data to optimize effectively. We're also happy to chat if you're scaling up toward that range.",
  },
  {
    q: "Do you offer white-label services for agencies?",
    a: "Yes — this is a big part of what we do. We integrate seamlessly as a white-label partner: your branding, your client relationship, our execution. Referral partnerships are also available.",
  },
  {
    q: "How long does it take to see results?",
    a: "Most campaigns show meaningful improvement within 30-60 days. Full optimization typically takes 90 days as we gather data and test. We'll be upfront with you if the timeline looks different for your situation.",
  },
  {
    q: "Do you handle creative, or just the ad management?",
    a: "Both. We can manage campaigns using your existing creative, or we can develop ad creative as part of the engagement — copy and static assets included. Note: for video-based platforms like YouTube, we manage the campaigns and strategy but don't produce video content.",
  },
  {
    q: "How do you report on performance?",
    a: "You get a live Looker Studio dashboard so you can check in anytime, plus a monthly strategy call and written recap. No waiting until end-of-month to know how your campaigns are running.",
  },
  {
    q: "Are you based in Canada?",
    a: "Yes — we're Canada-based but work with clients across Canada and the US. All billing is in CAD for Canadian clients, USD for US clients.",
  },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="border-b border-white/[0.08] last:border-0"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-6 py-6 text-left group"
        aria-expanded={open}
      >
        <span className="font-semibold text-white/80 group-hover:text-white transition-colors text-base md:text-lg pr-4">
          {q}
        </span>
        <span
          className={`shrink-0 w-7 h-7 rounded-full border border-white/20 flex items-center justify-center text-white/50 transition-all duration-300 ${
            open ? "bg-[#FF2D55] border-[#FF2D55] text-white rotate-45" : ""
          }`}
        >
          <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
            <path
              d="M6 1v10M1 6h10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-white/50 text-base leading-relaxed pb-6 pr-12">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 md:py-32 bg-[#0F0E17] px-6">
      <div className="max-w-4xl mx-auto">
        <div ref={ref} className="mb-14">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[#FF2D55] font-semibold text-sm uppercase tracking-widest mb-4"
          >
            FAQ
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-white leading-tight"
          >
            Questions? We&apos;ve got
            <span className="text-[#FF2D55]"> answers.</span>
          </motion.h2>
        </div>

        <div>
          {faqs.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
