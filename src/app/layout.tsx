import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Providers from "./providers";
import "./globals.css";
import TopNav from "@/components/TopNav";
import Footer from "@/components/Footer";
import SubPageHeader from "@/components/SubPageHeader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EVM Utils",
  description: "Helper functions for Ethereum developers",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`relative min-h-screen flex flex-col ${geistSans.variable} ${geistMono.variable} antialiased text-[var(--color-text-primary)]`}
      >
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <img
            src="/eth-home.jpg"
            alt="Background"
            className="w-full h-full object-cover blur-xs opacity-5"
          />
        </div>

        {/* Foreground Content */}
        <Providers>
          <TopNav />
          <main className="flex-1 mt-20">
            <SubPageHeader />
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
