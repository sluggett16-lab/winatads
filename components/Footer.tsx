export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0B0A12] border-t border-white/[0.06] px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <a href="#" className="flex items-center gap-1.5">
            <span className="inline-block -rotate-2 bg-[#FF2D55] text-white font-extrabold italic px-2.5 py-0.5 rounded-md text-xl tracking-tight">
              Win
            </span>
            <span className="text-white font-extrabold text-xl tracking-tight"> at Ads</span>
          </a>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-6 text-sm text-white/40">
            {[
              ["Services", "#services"],
              ["About", "#about"],
              ["Industries", "#industries"],
              ["Partners", "#partners"],
              ["Contact", "#contact"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="hover:text-white transition-colors"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-sm text-white/25">
            © {year} Win at Ads. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
