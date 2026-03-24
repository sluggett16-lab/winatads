"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const services = [
  {
    icon: "📈",
    title: "Paid Ads Management",
    desc: "More leads, more bookings, more sales — without burning your budget trying to figure it out yourself. I handle everything from strategy to daily optimizations across Google, Meta, TikTok, LinkedIn, and more.",
    color: "#FF2D55",
  },
  {
    icon: "🔍",
    title: "Ad Audits",
    desc: "Find out exactly where your ad budget is leaking — and get a clear plan to fix it. No fluff, just straight answers about what's working, what isn't, and what to do next.",
    color: "#FF6B35",
  },
  {
    icon: "🎨",
    title: "Branding for Ads",
    desc: "Ads that actually stop people from scrolling past your business. I develop creative concepts and ad visuals that make your brand stand out — even in a crowded feed.",
    color: "#9B59B6",
  },
  {
    icon: "📊",
    title: "Tracking & Analytics",
    desc: "Know exactly which ads are bringing in customers — and which ones aren't worth a cent. I set up proper tracking so you're making decisions based on real data, not guesses.",
    color: "#3498DB",
  },
  {
    icon: "📋",
    title: "Reporting Dashboards",
    desc: "See how your ads are performing in plain English, anytime you want. Live dashboards built in Looker Studio — no spreadsheets, no waiting on a monthly report.",
    color: "#2ECC71",
  },
  {
    icon: "💡",
    title: "Strategy & Consulting",
    desc: "Not sure where to start or why your ads aren't working? Let's figure it out together. I'll map out what will actually move the needle for your specific business and budget.",
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
    <section id="services" className="pt-12 pb-24 md:pt-16 md:pb-32 bg-[#0F0E17] px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={titleRef} className="mb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[#FF2D55] font-semibold text-sm uppercase tracking-widest mb-4"
          >
            What I Do For You
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold text-white leading-tight max-w-3xl"
          >
            Everything you need to <span className="text-[#FF2D55]">stop losing money</span>{" "}
            and start getting results.
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
