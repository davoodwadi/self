import type { Metadata } from "next";
import { Fraunces, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { DynamicFooter } from "./DynamicFooter";
import { FitSlides } from "@/components/slide-components/FitSlides";
import { CB_DIR, readCurriculum } from "@/lib/curriculum";

const CB = readCurriculum(CB_DIR);

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: CB.title,
    template: `%s · ${CB.title}`,
  },
  description: CB.summary,
  icons: {
    icon: "/icon-large.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${instrumentSans.variable}`}
    >
      <body className="antialiased">
        {children}
        <FitSlides />
        <DynamicFooter />
      </body>
    </html>
  );
}
