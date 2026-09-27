import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#0f172a",
};

export const metadata: Metadata = {
  title: "LIGA Design | Manufactura y Ensamblaje de Precisión",
  description: "Manufactura y ensamblaje de precisión para proyectos arquitectónicos. El aliado estratégico para arquitectos en Caracas, Venezuela.",
  manifest: "/manifest.json",
  icons: {
    icon: "/Logo_LIGA_Desing2.png",
    apple: "/Logo_LIGA_Design-2-removebg-preview.png",
  },
  openGraph: {
    title: "LIGA Design",
    description: "Manufactura y ensamblaje de precisión para proyectos arquitectónicos en Caracas.",
    url: "https://ligadesign.online",
    siteName: "LIGA Design",
    images: [
      {
        url: "/Logo_LIGA_Desing2.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "es_VE",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
