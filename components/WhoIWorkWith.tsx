export default function WhoIWorkWith() {
  const tiles = [
    "Agencies",
    "Small Businesses",
    "Medium Businesses",
    "SaaS",
    "Healthcare",
    "B2B",
    "Hospitality",
    "Real Estate",
  ];

  return (
    <section className="bg-[#0F0E17] py-10 px-6 border-b border-white/5">
      <div className="max-w-7xl mx-auto">
        <p className="text-white/30 text-xs font-semibold uppercase tracking-widest mb-5 text-center">
          Who I work with
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {tiles.map((label) => (
            <span
              key={label}
              className="px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.04] text-white/70 text-sm font-semibold hover:border-[#FF2D55]/50 hover:text-white hover:bg-[#FF2D55]/10 transition-all duration-200 cursor-default"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
