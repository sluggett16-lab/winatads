"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

const GRADE_COLORS: Record<string, string> = {
  A: "#2ECC71",
  B: "#3498DB",
  C: "#F39C12",
  D: "#FF6B35",
  F: "#FF2D55",
};

const questions = [
  {
    id: "platforms",
    question: "Which ad platforms are you currently running on?",
    multi: true,
    options: ["Google Ads", "Meta (FB/IG)", "TikTok", "LinkedIn", "None yet"],
  },
  {
    id: "budget",
    question: "What's your monthly ad spend?",
    multi: false,
    options: ["Under $1K", "$1K–$3K", "$3K–$10K", "$10K–$30K", "$30K+"],
  },
  {
    id: "goal",
    question: "What's your #1 campaign goal?",
    multi: false,
    options: ["Lead generation", "E-commerce sales", "App installs", "Brand awareness", "Not sure"],
  },
  {
    id: "tracking",
    question: "How's your conversion tracking set up?",
    multi: false,
    options: [
      "Fully set up — I track every conversion",
      "Partial — some things tracked",
      "Barely — just pixel basics",
      "I have no idea",
    ],
  },
  {
    id: "optimization",
    question: "How often do you actively optimize your campaigns?",
    multi: false,
    options: [
      "Daily — I'm in the accounts constantly",
      "Weekly reviews",
      "Monthly check-ins",
      "Set it and forget it",
    ],
  },
  {
    id: "landing_page",
    question: "What happens after someone clicks your ad?",
    multi: false,
    options: [
      "Dedicated landing page, CRO tested",
      "Dedicated landing page, not tested",
      "Homepage or a generic page",
      "Not sure",
    ],
  },
];

const SCORES: Record<string, Record<string, number>> = {
  platforms: { "Google Ads": 3, "Meta (FB/IG)": 3, TikTok: 2, LinkedIn: 2, "None yet": 0 },
  budget: { "Under $1K": 2, "$1K–$3K": 4, "$3K–$10K": 7, "$10K–$30K": 8, "$30K+": 8 },
  goal: { "Lead generation": 8, "E-commerce sales": 8, "App installs": 6, "Brand awareness": 3, "Not sure": 0 },
  tracking: {
    "Fully set up — I track every conversion": 10,
    "Partial — some things tracked": 5,
    "Barely — just pixel basics": 2,
    "I have no idea": 0,
  },
  optimization: {
    "Daily — I'm in the accounts constantly": 10,
    "Weekly reviews": 7,
    "Monthly check-ins": 3,
    "Set it and forget it": 0,
  },
  landing_page: {
    "Dedicated landing page, CRO tested": 10,
    "Dedicated landing page, not tested": 5,
    "Homepage or a generic page": 2,
    "Not sure": 0,
  },
};

type Answers = Record<string, string | string[]>;

function computeGrade(answers: Answers): { grade: string; score: number; tips: string[] } {
  let total = 0;

  const platforms = (answers.platforms as string[]) ?? [];
  const platformScore = Math.min(platforms.reduce((acc, p) => acc + (SCORES.platforms[p] ?? 0), 0), 8);
  total += platformScore;
  total += SCORES.budget[answers.budget as string] ?? 0;
  total += SCORES.goal[answers.goal as string] ?? 0;
  total += SCORES.tracking[answers.tracking as string] ?? 0;
  total += SCORES.optimization[answers.optimization as string] ?? 0;
  total += SCORES.landing_page[answers.landing_page as string] ?? 0;

  const pct = total / 56;
  const grade = pct >= 0.8 ? "A" : pct >= 0.65 ? "B" : pct >= 0.5 ? "C" : pct >= 0.35 ? "D" : "F";

  const tips: string[] = [];
  if ((SCORES.tracking[answers.tracking as string] ?? 0) < 5) {
    tips.push("Your conversion tracking is incomplete. Every un-tracked conversion is money you can't optimize toward. Fix this first.");
  }
  if ((SCORES.landing_page[answers.landing_page as string] ?? 0) < 5) {
    tips.push("Sending clicks to your homepage is like pouring water into a colander. A dedicated, tested landing page can 2–3x your conversion rate.");
  }
  if ((SCORES.optimization[answers.optimization as string] ?? 0) < 5) {
    tips.push("Campaigns left alone lose money. The algorithm learns, costs rise, and creative fatigues — weekly optimization is the minimum.");
  }
  if (platformScore < 4 && tips.length < 3) {
    tips.push("Running on just one platform limits your reach and makes you dependent on a single algorithm. A multi-platform approach de-risks your spend.");
  }
  if ((SCORES.goal[answers.goal as string] ?? 0) === 0 && tips.length < 3) {
    tips.push("Running ads without a clear goal is like driving without a destination. Every campaign needs a single measurable objective.");
  }

  return { grade, score: total, tips: tips.slice(0, 3) };
}

const GRADE_LABELS: Record<string, string> = {
  A: "You're crushing it — small wins left to find.",
  B: "Solid foundation. A few fixes could unlock serious growth.",
  C: "Room to improve — and the improvements are very findable.",
  D: "There's money being left on the table. Let's fix that.",
  F: "Okay, we need to talk. The good news? It only goes up from here.",
};

interface Props {
  onClose: () => void;
}

export default function AuditQuiz({ onClose }: Props) {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [showResults, setShowResults] = useState(false);
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!mounted) return null;

  const q = questions[step];
  const answer = answers[q?.id];
  const isMulti = q?.multi;
  const canAdvance = isMulti
    ? Array.isArray(answer) && answer.length > 0
    : !!answer;

  const selectOption = (opt: string) => {
    if (isMulti) {
      const current = (answers[q.id] as string[]) ?? [];
      const updated = current.includes(opt)
        ? current.filter((o) => o !== opt)
        : [...current, opt];
      setAnswers({ ...answers, [q.id]: updated });
    } else {
      setAnswers({ ...answers, [q.id]: opt });
    }
  };

  const advance = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailStatus("sending");
    const { grade, score, tips } = computeGrade(answers);
    try {
      const res = await fetch("/api/audit-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, grade, score, answers, tips }),
      });
      setEmailStatus(res.ok ? "sent" : "error");
    } catch {
      setEmailStatus("error");
    }
  };

  const { grade, tips } = showResults ? computeGrade(answers) : { grade: "", tips: [] };
  const gradeColor = GRADE_COLORS[grade] ?? "#FF2D55";
  const progress = ((step + (showResults ? 1 : 0)) / questions.length) * 100;

  const modal = (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className="fixed inset-x-4 bottom-4 top-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-xl z-[101] bg-[#0F0E17] border border-white/10 rounded-3xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Progress bar */}
        <div className="h-1 bg-white/10">
          <motion.div
            className="h-full bg-[#FF2D55]"
            animate={{ width: `${showResults ? 100 : progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-2">
          <div className="flex items-center gap-2">
            <span className="inline-block -rotate-2 bg-[#FF2D55] text-white font-extrabold italic px-2 py-0.5 rounded-md text-sm tracking-tight">
              Win
            </span>
            <span className="text-white font-extrabold text-sm"> at Ads</span>
          </div>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white transition-colors text-xl leading-none"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          {!showResults ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25 }}
            >
              <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-3 mt-4">
                Question {step + 1} of {questions.length}
              </p>
              <h3 className="text-xl font-extrabold text-white mb-6 leading-snug">
                {q.question}
                {isMulti && <span className="text-white/40 text-sm font-normal ml-2">(select all that apply)</span>}
              </h3>

              <div className="space-y-3">
                {q.options.map((opt) => {
                  const selected = isMulti
                    ? (answers[q.id] as string[] ?? []).includes(opt)
                    : answers[q.id] === opt;
                  return (
                    <button
                      key={opt}
                      onClick={() => selectOption(opt)}
                      className={`w-full text-left px-5 py-4 rounded-xl border font-medium text-sm transition-all duration-200 ${
                        selected
                          ? "border-[#FF2D55] bg-[#FF2D55]/10 text-white"
                          : "border-white/10 bg-white/[0.03] text-white/60 hover:border-white/30 hover:text-white"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={advance}
                disabled={!canAdvance}
                className="w-full mt-6 bg-[#FF2D55] hover:bg-[#CC2444] disabled:opacity-30 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-95"
              >
                {step < questions.length - 1 ? "Next →" : "See My Grade →"}
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="pt-4"
            >
              {/* Grade circle */}
              <div className="flex flex-col items-center mb-6">
                <div
                  className="w-28 h-28 rounded-full flex items-center justify-center mb-4"
                  style={{
                    border: `4px solid ${gradeColor}`,
                    boxShadow: `0 0 40px ${gradeColor}40`,
                  }}
                >
                  <span className="text-5xl font-extrabold" style={{ color: gradeColor }}>
                    {grade}
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-white text-center">
                  Your Ad Account Grade
                </h3>
                <p className="text-white/50 text-sm text-center mt-2 max-w-xs">
                  {GRADE_LABELS[grade]}
                </p>
              </div>

              {/* Tips */}
              {tips.length > 0 && (
                <div className="space-y-3 mb-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-white/40">
                    Quick wins we spotted
                  </p>
                  {tips.map((tip, i) => (
                    <div key={i} className="flex gap-3 bg-white/[0.04] border border-white/[0.08] rounded-xl p-4">
                      <span className="text-[#FF2D55] font-extrabold text-sm shrink-0 mt-0.5">
                        {i + 1}.
                      </span>
                      <p className="text-white/70 text-sm leading-relaxed">{tip}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Email capture */}
              <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5 mb-4">
                <p className="text-white font-bold text-sm mb-1">
                  Want the full action plan?
                </p>
                <p className="text-white/40 text-xs mb-4">
                  We&apos;ll email you your grade + a prioritized fix list.
                </p>
                {emailStatus === "sent" ? (
                  <p className="text-[#2ECC71] font-semibold text-sm text-center py-2">
                    Sent! Check your inbox.
                  </p>
                ) : (
                  <form onSubmit={handleEmailSubmit} className="flex gap-2">
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#FF2D55]/50 text-sm"
                    />
                    <button
                      type="submit"
                      disabled={emailStatus === "sending"}
                      className="bg-[#FF2D55] hover:bg-[#CC2444] disabled:opacity-50 text-white font-bold px-5 py-3 rounded-xl text-sm transition-all"
                    >
                      {emailStatus === "sending" ? "..." : "Send"}
                    </button>
                  </form>
                )}
                {emailStatus === "error" && (
                  <p className="text-red-400 text-xs mt-2">Something went wrong. Try again.</p>
                )}
              </div>

              <a
                href="#contact"
                onClick={onClose}
                className="block w-full text-center bg-[#FF2D55] hover:bg-[#CC2444] text-white font-bold py-4 rounded-xl transition-all duration-200 hover:scale-[1.02]"
              >
                Book a free audit call →
              </a>
            </motion.div>
          )}
        </div>
      </motion.div>
    </>
  );

  return createPortal(modal, document.body);
}
