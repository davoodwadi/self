import type { Metadata } from "next";
import { Fraunces, Lora, Libre_Baskerville, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { DynamicFooter } from "./DynamicFooter";
import { FitSlides } from "@/components/slide-components/FitSlides";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const libreBaskerville = Libre_Baskerville({
  variable: "--font-libre-baskerville",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Digital Transformation",
  description: "Davood Wadi, Ph.D.",
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
      className={`${fraunces.variable} ${lora.variable} ${libreBaskerville.variable} ${ibmPlexMono.variable}`}
    >
      <body
        className={`${fraunces.variable} ${lora.variable} ${libreBaskerville.variable} ${ibmPlexMono.variable} antialiased theme-warm-noir`}
      >
        {children}
        <FitSlides />
        <DynamicFooter />
      </body>
    </html>
  );
}

