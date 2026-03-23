import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Win at Ads — Paid Media That Actually Wins",
  description:
    "Results-obsessed paid media agency for SMBs and agency partners. Google, Meta, TikTok — we run ads that convert.",
  openGraph: {
    title: "Win at Ads — Paid Media That Actually Wins",
    description:
      "Results-obsessed paid media agency for SMBs and agency partners.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={plusJakarta.className}>
      <body className="grain">{children}</body>
    </html>
  );
}
