import type { Metadata } from "next";
import { Fraunces, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { DynamicFooter } from "@/components/slide-components/DynamicFooter";
import { FitSlides } from "@/components/slide-components/FitSlides";
import { IM_DIR, readCurriculum } from "@/lib/curriculum";

const IM = readCurriculum(IM_DIR);

// Fraunces carries the display voice: an editorial serif with enough
// eccentricity (the WONK axis) to not read as a default pairing.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

// Body copy is set in a grotesque rather than a serif: at projection
// distance it holds up far better than Lora did.
const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: IM.title,
    template: `%s · ${IM.title}`,
  },
  description: IM.summary,
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
