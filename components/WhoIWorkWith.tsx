export default function WhoIWorkWith() {
  const clients = [
    {
      label: "Small Businesses",
      desc: "You've got a tight budget and can't afford to waste a dollar. I help small business owners get real results from paid ads without the agency overhead.",
    },
    {
      label: "Medium-Sized Businesses",
      desc: "You're past the early stage and ready to scale — but your current ads aren't keeping up. I help growing businesses unlock their next level of growth.",
    },
    {
      label: "SaaS & Tech Companies",
      desc: "More trials, demos, and paying users. I run paid media for SaaS companies that need to lower customer acquisition costs and grow faster.",
    },
    {
      label: "Healthcare Providers",
      desc: "From telehealth platforms to local clinics, I help healthcare businesses fill their calendars with more booked appointments through targeted paid campaigns.",
    },
    {
      label: "Hospitality & Hotels",
      desc: "More direct bookings, less commission to OTAs. I help hotels and resorts run paid search and social campaigns that drive revenue year-round.",
    },
    {
      label: "B2B Companies",
      desc: "Reaching the right decision-makers is hard. I run B2B paid media that targets the right people at the right companies — and actually converts.",
    },
    {
      label: "Real Estate",
      desc: "Whether you're generating buyer leads, seller leads, or promoting listings, I help real estate professionals run ads that fill their pipeline.",
    },
    {
      label: "Agencies",
      desc: "Need white-label paid media for your clients? I plug in seamlessly as your behind-the-scenes partner — your brand, my execution.",
    },
  ];

  return (
    <section className="bg-[#F8F8FC] py-16 md:py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <p className="text-[#FF2D55] font-semibold text-sm uppercase tracking-widest mb-4 text-center">
          Who I Work With
        </p>
        <h2 className="text-3xl md:text-5xl font-extrabold text-[#0F0E17] text-center mb-4 leading-tight">
          If you run ads and want{" "}
          <span className="text-[#FF2D55]">better results,</span> we should talk.
        </h2>
        <p className="text-[#0F0E17]/50 text-center max-w-2xl mx-auto mb-12 text-lg leading-relaxed">
          I work with small businesses, medium-sized companies, and agencies across Canada and the US — in industries where paid media actually moves the needle.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {clients.map((c) => (
            <div
              key={c.label}
              className="bg-white border border-[#0F0E17]/[0.08] rounded-2xl p-6 hover:border-[#FF2D55]/40 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF2D55] shrink-0" />
                <span className="text-[#0F0E17] font-bold text-sm">{c.label}</span>
              </div>
              <p className="text-[#0F0E17]/50 text-sm leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
