import type { Metadata } from "next";
import { Instrument_Serif, Newsreader, JetBrains_Mono } from "next/font/google";
import { FitSlides } from "@/components/slide-components/FitSlides";
import "./sample.css";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-display",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-editorial",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Week 01: Responsible AI & Algorithmic Governance, Sample Slide",
  description:
    "Foundations of Responsible AI in Markets: Why Market Algorithms Require Governance",
};

export default function SampleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${newsreader.variable} ${jetbrainsMono.variable}`}
    >
      <body className="cinematic-surface antialiased selection:bg-[#f5e4c3] selection:text-[#151412]">
        <FitSlides />
        {children}
      </body>
    </html>
  );
}
