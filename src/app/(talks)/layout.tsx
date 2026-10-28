import type { Metadata } from "next";
import { Newsreader, IBM_Plex_Sans } from "next/font/google";
// Talks borrow the Marketing Research & Analytics look ("Field Ledger").
import "../(courses-mra)/globals.css";
import "./talks.css";
import { FitSlides } from "@/components/slide-components/FitSlides";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Talks | Davood Wadi, PhD",
  icons: { icon: "/icon-large.svg" },
};

export default function TalksLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${newsreader.variable} ${plexSans.variable}`}>
      <body className="antialiased">
        {children}
        <FitSlides />
      </body>
    </html>
  );
}
