import type { Metadata } from "next";
import { Libre_Franklin } from "next/font/google";
import "./globals.css";
import { DynamicFooter } from "@/components/slide-components/DynamicFooter";
import { FitSlides } from "@/components/slide-components/FitSlides";
import { DME_DIR, readCurriculum } from "@/lib/curriculum";

const DME = readCurriculum(DME_DIR);

// Libre Franklin sets every line, headings and plate labels included.
const franklin = Libre_Franklin({
  variable: "--font-franklin",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: DME.title,
    template: `%s | ${DME.title}`,
  },
  description: DME.summary,
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
    <html lang="en" className={franklin.variable}>
      <body className="antialiased">
        {children}
        <FitSlides />
        <DynamicFooter />
      </body>
    </html>
  );
}
