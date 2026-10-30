import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Courses | Davood Wadi, PhD",
  description:
    "Course websites and lecture decks by Davood Wadi, PhD: Applications of AI in Business, Consumer Behavior, Digital Marketing & E-Commerce, Digital Transformation, Introduction to Marketing, Marketing Research & Analytics, and Responsible AI & Algorithmic Governance.",
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
      <body className={`${sourceSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
