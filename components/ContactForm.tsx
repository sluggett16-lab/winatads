"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import confetti from "canvas-confetti";

export default function ContactForm() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", company: "", message: "" });
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#FF2D55", "#FF6B35", "#F8F8FC", "#9B59B6"],
        });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full bg-white/[0.04] border border-white/[0.10] rounded-xl px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:border-[#FF2D55]/60 focus:bg-white/[0.06] transition-all duration-200 text-base";

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#0F0E17] px-6">
      <div className="max-w-7xl mx-auto">
        <div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
        >
          {/* Left: copy */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-[#FF2D55] font-semibold text-sm uppercase tracking-widest mb-4"
            >
              Get In Touch
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6"
            >
              Your ads called.
              <br />
              <span className="text-[#FF2D55]">They want better management.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-white/50 text-lg leading-relaxed mb-8"
            >
              Tell us what&apos;s going on with your ads. We&apos;ll be honest
              even if it hurts — and then we&apos;ll fix it.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-5"
            >
              {[
                { icon: "⚡", text: "No sales pitch — just a real conversation" },
                { icon: "🎯", text: "We'll tell you exactly what's broken (for free)" },
                { icon: "🇨🇦", text: "Canada & USA — we've got you" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-4">
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-white/60 font-medium">{item.text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {status === "sent" ? (
              <div className="bg-white/[0.03] border border-[#FF2D55]/20 rounded-2xl p-10 text-center">
                <div className="text-5xl mb-5">🎉</div>
                <h3 className="text-2xl font-extrabold text-white mb-3">
                  Message sent!
                </h3>
                <p className="text-white/50">
                  Thanks for reaching out. We&apos;ll be in touch within one
                  business day.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <input
                    type="text"
                    placeholder="Your name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={inputClass}
                  />
                  <input
                    type="text"
                    placeholder="Company"
                    value={form.company}
                    onChange={(e) =>
                      setForm({ ...form, company: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email address"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClass}
                />
                <textarea
                  placeholder="Tell us about your business and goals..."
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className={`${inputClass} resize-none`}
                />
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full bg-[#FF2D55] hover:bg-[#CC2444] disabled:opacity-60 text-white font-bold py-4 rounded-xl text-base transition-all duration-200 hover:scale-[1.02] active:scale-95"
                >
                  {status === "sending" ? "Sending..." : "Send Message →"}
                </button>
                {status === "error" && (
                  <p className="text-red-400 text-sm text-center">
                    Something went wrong. Please try emailing us directly.
                  </p>
                )}
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
