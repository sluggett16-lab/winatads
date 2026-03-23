"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const services = [
  {
    icon: "📈",
    title: "Paid Ads Management",
    desc: "Full-service campaign management across Google, Meta, TikTok, LinkedIn, and more. We handle everything from strategy to daily optimizations.",
    color: "#FF2D55",
  },
  {
    icon: "🔍",
    title: "Ad Audits",
    desc: "Brutally honest audits of your current ad accounts. We'll tell you exactly what's burning your budget and how to fix it — fast.",
    color: "#FF6B35",
  },
  {
    icon: "🎨",
    title: "Branding for Ads",
    desc: "Ad creative that stops the scroll. We develop visual identities and ad concepts that make your brand impossible to ignore.",
    color: "#9B59B6",
  },
  {
    icon: "📊",
    title: "Tracking & Analytics",
    desc: "GA4, GTM, Meta Pixel, Conversions API — we set up airtight tracking so every dollar has a clear attribution path.",
    color: "#3498DB",
  },
  {
    icon: "📋",
    title: "Reporting Dashboards",
    desc: "Beautiful, live dashboards your team will actually use. Built in Looker Studio or custom — no more spreadsheet chaos.",
    color: "#2ECC71",
  },
  {
    icon: "💡",
    title: "Strategy & Consulting",
    desc: "Not sure where to start? We'll map your full paid media strategy, identify quick wins, and build a roadmap to scale.",
    color: "#F39C12",
  },
];

function TiltCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative h-full bg-white/[0.03] border border-white/[0.08] rounded-2xl p-7 cursor-default transition-all duration-200 hover:border-white/20 hover:bg-white/[0.06]"
        style={{ transformStyle: "preserve-3d", transition: "transform 0.15s ease" }}
      >
        {/* Glow on hover */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${service.color}15, transparent 70%)`,
          }}
        />
        <div className="text-4xl mb-4">{service.icon}</div>
        <h3 className="text-lg font-bold text-white mb-3">{service.title}</h3>
        <p className="text-sm text-white/50 leading-relaxed">{service.desc}</p>
        <div
          className="mt-5 w-8 h-0.5 transition-all duration-300 group-hover:w-16"
          style={{ backgroundColor: service.color }}
        />
      </div>
    </motion.div>
  );
}

export default function Services() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-60px" });

  return (
    <section id="services" className="py-24 md:py-32 bg-[#0F0E17] px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={titleRef} className="mb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[#FF2D55] font-semibold text-sm uppercase tracking-widest mb-4"
          >
            What We Do
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold text-white leading-tight max-w-2xl"
          >
            Every service, built to
            <span className="text-[#FF2D55]"> drive revenue.</span>
          </motion.h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <TiltCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
