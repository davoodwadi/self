import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { DynamicFooter } from "./DynamicFooter";
import { FitSlides } from "@/components/slide-components/FitSlides";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
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
    <html lang="en" className={sourceSans.variable}>
      <body className={`${sourceSans.variable} antialiased`}>
        {children}
        <FitSlides />
        <DynamicFooter />
      </body>
    </html>
  );
}

