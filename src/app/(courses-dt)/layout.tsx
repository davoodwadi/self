import type { Metadata } from "next";
import { Merriweather, Open_Sans, Space_Grotesk, Inter, Space_Mono, Fira_Code } from "next/font/google";
import "./globals.css";
import { DynamicFooter } from "./DynamicFooter";

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Digital Transformation",
  description: "Davood Wadi, Ph.D.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${merriweather.variable} ${openSans.variable} ${spaceGrotesk.variable} ${inter.variable} ${spaceMono.variable} ${firaCode.variable} antialiased`}
      >
        {children}
        <DynamicFooter />
      </body>
    </html>
  );
}
