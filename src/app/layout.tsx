import type { Metadata } from "next";
import { Sora, Outfit } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Tecla Casalone | Digital Marketing & AI Visibility",
  description:
    "Digital marketing specialist, AI Marketing & GEO. Co-founder di Citation Rate. Aiuto i brand a migliorare la loro visibilità nei sistemi AI.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${sora.variable} ${outfit.variable}`}>
      <body className="min-h-screen bg-[#faf8f5] text-[#1a1a1a] font-[var(--font-body)] antialiased">
        {children}
      </body>
    </html>
  );
}
