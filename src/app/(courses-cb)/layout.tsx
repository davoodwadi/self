import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { DynamicFooter } from "./DynamicFooter";
import { FitSlides } from "@/components/slide-components/FitSlides";
import { CB_DIR, readCurriculum } from "@/lib/curriculum";

const CB = readCurriculum(CB_DIR);

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: CB.title,
    template: `%s | ${CB.title}`,
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
    <html lang="en" className={sourceSans.variable}>
      <body className={`${sourceSans.variable} antialiased`}>
        {children}
        <FitSlides />
        <DynamicFooter />
      </body>
    </html>
  );
}
