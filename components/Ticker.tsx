export default function Ticker() {
  const items = [
    "PAID ADS",
    "NO BS",
    "GOOGLE",
    "CRUSHING IT",
    "META",
    "JUST ROAS",
    "TIKTOK",
    "YOUR COMPETITORS ARE SCARED",
    "LINKEDIN",
    "RESULTS OR BUST",
    "AUDITS",
    "WE GO HARD",
    "CONVERSIONS",
    "CERTIFIED WINNERS",
  ];

  const repeated = [...items, ...items];

  return (
    <div className="bg-[#FF2D55] py-3.5" style={{ overflow: "clip" }}>
      <div
        className="flex whitespace-nowrap"
        style={{ animation: "ticker 28s linear infinite", willChange: "transform" }}
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
