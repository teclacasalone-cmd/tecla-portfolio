import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Tecla Casalone | Digital Marketing & AI Visibility",
  description:
    "Digital marketing specialist, AI Marketing & GEO. Co-founder di Citation Rate. Aiuto i brand a migliorare la loro visibilità nei sistemi AI.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${spaceGrotesk.variable} ${dmSans.variable}`}>
      <body className="min-h-screen bg-[#111] text-[#e8e8e8] font-body antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
