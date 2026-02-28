import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import NetworkBackground from "@/components/NetworkBackground";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Davood Wadi, Ph.D.",
  description: "Davood Wadi, Ph.D.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased bg-dark-900 text-gray-100 selection:bg-accent-500 selection:text-white relative`}
      >
        <NetworkBackground />
        <div className="ambient-glow"></div>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
