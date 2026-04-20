import type { Metadata } from "next";
import { Playfair_Display, Lora, Libre_Baskerville, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { DynamicFooter } from "@/components/slide-components/DynamicFooter";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400"],
});

const libreBaskerville = Libre_Baskerville({
  variable: "--font-libre-baskerville",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Introduction to Marketing",
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
    <html lang="en">
      <body
        className={`${playfairDisplay.variable} ${lora.variable} ${libreBaskerville.variable} ${ibmPlexMono.variable} antialiased theme-pastel-peach`}
      >
        {children}
        <DynamicFooter />
      </body>
    </html>
  );
}

