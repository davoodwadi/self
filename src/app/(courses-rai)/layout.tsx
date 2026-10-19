import type { Metadata } from "next";
import { Newsreader, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { DynamicFooter } from "@/components/slide-components/DynamicFooter";
import { FitSlides } from "@/components/slide-components/FitSlides";
import { RAI_DIR, readCurriculum } from "@/lib/curriculum";

const RAI = readCurriculum(RAI_DIR);

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
  title: {
    default: RAI.title,
    template: `%s · ${RAI.title}`,
  },
  description: RAI.summary,
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
    <html lang="en" className={`${newsreader.variable} ${plexSans.variable}`}>
      <body className="antialiased">
        {children}
        <FitSlides />
        <DynamicFooter />
      </body>
    </html>
  );
}
