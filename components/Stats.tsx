"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 12, suffix: "M+", prefix: "$", label: "Revenue Driven" },
  { value: 200, suffix: "+", prefix: "", label: "Campaigns Crushed" },
  { value: 98, suffix: "%", prefix: "", label: "Client Retention" },
  { value: 7, suffix: "+", prefix: "", label: "Years of Winning" },
];

function Counter({
  value,
  suffix,
  prefix,
  started,
}: {
  value: number;
  suffix: string;
  prefix: string;
  started: boolean;
}) {
  const [count, setCount] = useState(0);
  const duration = 1800;
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    if (!started) return;
    let frame: number;
    const animate = (ts: number) => {
      if (!startTime.current) startTime.current = ts;
      const elapsed = ts - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(parseFloat((eased * value).toFixed(value % 1 === 0 ? 0 : 1)));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [started, value]);

  return (
    <span>
      {prefix}
      {value % 1 !== 0 ? count.toFixed(1) : Math.round(count)}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="bg-[#F8F8FC] py-16 border-y border-[#0F0E17]/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-extrabold text-[#FF2D55] mb-2">
                <Counter
                  value={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                  started={inView}
                />
              </div>
              <div className="text-sm text-[#0F0E17]/50 font-medium uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
