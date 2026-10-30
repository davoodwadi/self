import type { Metadata } from "next";
import { EB_Garamond, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { DynamicFooter } from "./_components/DynamicFooter";
import { FitSlides } from "@/components/slide-components/FitSlides";

const ebGaramond = EB_Garamond({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Courses - Davood Wadi, Ph.D.",
  description: "Courses - Davood Wadi, Ph.D.",
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
      className={`${ebGaramond.variable} ${sourceSans.variable}`}
    >
      <body
        className={`${ebGaramond.variable} ${sourceSans.variable} antialiased`}
      >
        {children}
        <FitSlides />
        <DynamicFooter />
      </body>
    </html>
  );
}
