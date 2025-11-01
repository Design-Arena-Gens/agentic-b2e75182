import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Agentic Signal Core | AI Crypto Trading Cockpit",
  description:
    "Autonomous AI trading terminal delivering real-time crypto buy and sell signals powered by momentum, liquidity and volatility analytics.",
  metadataBase: new URL("https://agentic-b2e75182.vercel.app"),
  openGraph: {
    title: "Agentic Signal Core",
    description:
      "AI-first crypto execution layer with live buy & sell signals, liquidity depth analytics and risk telemetry.",
    url: "https://agentic-b2e75182.vercel.app",
    siteName: "Agentic Signal Core",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agentic Signal Core",
    description:
      "AI-powered crypto trading cockpit streaming live directional signals and market telemetry.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
