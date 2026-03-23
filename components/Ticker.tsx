export default function Ticker() {
  const items = [
    "PAID ADS",
    "META",
    "GOOGLE",
    "TIKTOK",
    "LINKEDIN",
    "AUDITS",
    "TRACKING",
    "DASHBOARDS",
    "STRATEGY",
    "ROI",
    "RESULTS",
    "ROAS",
    "CONVERSIONS",
  ];

  const repeated = [...items, ...items];

  return (
    <div className="bg-[#FF2D55] py-3.5" style={{ overflow: "clip" }}>
      <div
        className="flex whitespace-nowrap"
        style={{ animation: "ticker 28s linear infinite" }}
      >
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="text-white font-bold text-sm tracking-widest uppercase px-6">
              {item}
            </span>
            <span className="text-white/40 text-xs">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
