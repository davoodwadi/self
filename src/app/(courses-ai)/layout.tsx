import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { DynamicFooter } from "./_components/DynamicFooter";
import { FitSlides } from "@/components/slide-components/FitSlides";

const sourceSans = Source_Sans_3({
  variable: "--font-open-sans",
  subsets: ["latin"],
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
    <html lang="en" className={sourceSans.variable}>
      <body className={`${sourceSans.variable} antialiased`}>
        {children}
        <FitSlides />
        <DynamicFooter />
      </body>
    </html>
  );
}
