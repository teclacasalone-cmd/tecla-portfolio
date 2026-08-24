import type { Metadata } from "next";
import { Sora, Outfit } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const outfit = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Tecla Casalone | Digital Marketing, AI & Web Development",
  description:
    "Digital marketing specialist, AI Marketing, GEO & Web Developer. Co-founder di Citation Rate. Costruisco siti web, strategie AI e campagne digitali.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${sora.variable} ${outfit.variable}`}>
      <body className="min-h-screen bg-[#060612] text-white font-[var(--font-body)] antialiased noise-bg">
        {children}
      </body>
    </html>
  );
}
