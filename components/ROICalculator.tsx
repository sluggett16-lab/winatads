"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const MULTIPLIERS: Record<string, number> = {
  Healthcare: 3.2,
  "SaaS / Tech": 2.7,
  "Hospitality / Resorts": 2.6,
  "E-commerce": 2.4,
  Other: 2.2,
};

const ROAS_CAPS: Record<string, number> = {
  Healthcare: 12,
  "SaaS / Tech": 10,
  "Hospitality / Resorts": 10,
  "E-commerce": 8,
  Other: 8,
};

function calculate(spend: number, currentROAS: number, industry: string) {
  const multiplier = MULTIPLIERS[industry] ?? 2.2;
  const cap = ROAS_CAPS[industry] ?? 8;
  const projectedROAS = Math.min(currentROAS * multiplier, cap);
  const currentRevenue = spend * currentROAS;
  const projectedRevenue = spend * projectedROAS;
  const monthlyUplift = projectedRevenue - currentRevenue;
  return { currentRevenue, projectedRevenue, projectedROAS, monthlyUplift, annualUplift: monthlyUplift * 12 };
}

function formatCurrency(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n.toFixed(0)}`;
}

function AnimatedNumber({ value, format }: { value: number; format: (n: number) => string }) {
  const [displayed, setDisplayed] = useState(value);
  const prevRef = useRef(value);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const start = prevRef.current;
    const end = value;
    const duration = 600;
    const startTime = performance.now();

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(start + (end - start) * eased);
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
      else prevRef.current = end;
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [value]);

  return <span>{format(displayed)}</span>;
}

export default function ROICalculator() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [spend, setSpend] = useState(5000);
  const [roas, setRoas] = useState(2.0);
  const [industry, setIndustry] = useState("Healthcare");
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const results = calculate(spend, roas, industry);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailStatus("sending");
    try {
      const res = await fetch("/api/roi-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, spend, roas, industry, results }),
      });
      setEmailStatus(res.ok ? "sent" : "error");
    } catch {
      setEmailStatus("error");
    }
  };

  return (
    <section id="roi-calculator" className="py-24 md:py-32 bg-[#F8F8FC] px-6">
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-[#FF2D55] font-semibold text-sm uppercase tracking-widest mb-4">
            Free Calculator
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0F0E17] leading-tight max-w-2xl">
            What could your ads be{" "}
            <span className="text-[#FF2D55]">actually making?</span>
          </h2>
          <p className="text-[#0F0E17]/50 mt-3 text-lg max-w-xl">
            Plug in your numbers. See what&apos;s possible. Try not to cry.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="bg-white rounded-3xl p-8 shadow-sm border border-[#0F0E17]/[0.06] space-y-8"
          >
            {/* Monthly Spend */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-bold text-[#0F0E17]/70 uppercase tracking-wider">
                  Monthly Ad Spend
                </label>
                <span className="text-xl font-extrabold text-[#0F0E17]">
                  {spend >= 1000 ? `$${(spend / 1000).toFixed(spend % 1000 === 0 ? 0 : 1)}K` : `$${spend}`}
                  <span className="text-sm font-medium text-[#0F0E17]/40">/mo</span>
                </span>
              </div>
              <input
                type="range"
                min={500}
                max={50000}
                step={500}
                value={spend}
                onChange={(e) => setSpend(Number(e.target.value))}
                style={{
                  background: `linear-gradient(to right, #FF2D55 ${((spend - 500) / 49500) * 100}%, rgba(15,14,23,0.1) ${((spend - 500) / 49500) * 100}%)`,
                }}
              />
              <div className="flex justify-between text-xs text-[#0F0E17]/30 mt-1">
                <span>$500</span><span>$50K</span>
              </div>
            </div>

            {/* Current ROAS */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-bold text-[#0F0E17]/70 uppercase tracking-wider">
                  Current ROAS
                </label>
                <span className="text-xl font-extrabold text-[#0F0E17]">
                  {roas.toFixed(1)}x
                </span>
              </div>
              <input
                type="range"
                min={1.0}
                max={8.0}
                step={0.1}
                value={roas}
                onChange={(e) => setRoas(Number(e.target.value))}
                style={{
                  background: `linear-gradient(to right, #FF2D55 ${((roas - 1) / 7) * 100}%, rgba(15,14,23,0.1) ${((roas - 1) / 7) * 100}%)`,
                }}
              />
              <div className="flex justify-between text-xs text-[#0F0E17]/30 mt-1">
                <span>1x</span><span>8x</span>
              </div>
            </div>

            {/* Industry */}
            <div>
              <label className="block text-sm font-bold text-[#0F0E17]/70 uppercase tracking-wider mb-3">
                Industry
              </label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full bg-[#F8F8FC] border border-[#0F0E17]/10 rounded-xl px-4 py-3 text-[#0F0E17] font-semibold focus:outline-none focus:border-[#FF2D55]/50 transition-colors"
              >
                {Object.keys(MULTIPLIERS).map((ind) => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
            </div>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="space-y-4"
          >
            {/* Current */}
            <div className="bg-white rounded-2xl p-6 border border-[#0F0E17]/[0.06]">
              <p className="text-xs font-bold uppercase tracking-widest text-[#0F0E17]/40 mb-1">
                Current Monthly Revenue
              </p>
              <p className="text-3xl font-extrabold text-[#0F0E17]">
                <AnimatedNumber value={results.currentRevenue} format={formatCurrency} />
              </p>
              <p className="text-xs text-[#0F0E17]/40 mt-1">at {roas.toFixed(1)}x ROAS</p>
            </div>

            {/* Projected */}
            <div className="bg-[#0F0E17] rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#FF2D55] rounded-full opacity-10 blur-2xl -translate-y-1/2 translate-x-1/2" />
              <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1">
                Projected with Win at Ads
              </p>
              <p className="text-4xl font-extrabold text-[#FF2D55] text-glow">
                <AnimatedNumber value={results.projectedRevenue} format={formatCurrency} />
              </p>
              <p className="text-xs text-white/40 mt-1">
                at {results.projectedROAS.toFixed(1)}x ROAS
              </p>
            </div>

            {/* Uplift grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-5 border border-[#0F0E17]/[0.06]">
                <p className="text-xs font-bold uppercase tracking-widest text-[#0F0E17]/40 mb-1">
                  Monthly Uplift
                </p>
                <p className="text-2xl font-extrabold text-[#2ECC71]">
                  +<AnimatedNumber value={results.monthlyUplift} format={formatCurrency} />
                </p>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-[#0F0E17]/[0.06]">
                <p className="text-xs font-bold uppercase tracking-widest text-[#0F0E17]/40 mb-1">
                  Annual Opportunity
                </p>
                <p className="text-2xl font-extrabold text-[#2ECC71]">
                  +<AnimatedNumber value={results.annualUplift} format={formatCurrency} />
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3 pt-2">
              <a
                href="#contact"
                className="w-full text-center bg-[#FF2D55] hover:bg-[#CC2444] text-white font-bold py-4 rounded-xl text-base transition-all duration-200 hover:scale-[1.02] active:scale-95"
              >
                Claim my free audit →
              </a>
              {!showEmailCapture && emailStatus !== "sent" && (
                <button
                  onClick={() => setShowEmailCapture(true)}
                  className="w-full text-center text-[#0F0E17]/50 hover:text-[#0F0E17] text-sm font-medium transition-colors"
                >
                  Email me this report
                </button>
              )}
              {showEmailCapture && emailStatus !== "sent" && (
                <form onSubmit={handleEmailSubmit} className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-white border border-[#0F0E17]/10 rounded-xl px-4 py-3 text-[#0F0E17] placeholder-[#0F0E17]/30 focus:outline-none focus:border-[#FF2D55]/50 text-sm"
                  />
                  <button
                    type="submit"
                    disabled={emailStatus === "sending"}
                    className="bg-[#0F0E17] hover:bg-[#0F0E17]/80 disabled:opacity-50 text-white font-bold px-5 py-3 rounded-xl text-sm transition-all"
                  >
                    {emailStatus === "sending" ? "..." : "Send"}
                  </button>
                </form>
              )}
              {emailStatus === "sent" && (
                <p className="text-center text-sm text-[#2ECC71] font-medium">
                  Report sent! Check your inbox.
                </p>
              )}
              {emailStatus === "error" && (
                <p className="text-center text-sm text-red-500">
                  Something went wrong. Try again.
                </p>
              )}
            </div>

            <p className="text-xs text-[#0F0E17]/30 text-center">
              *Projections based on average results across client campaigns. Individual results vary.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
