import type { Metadata } from "next";
import Providers from "./providers";
import TopNav from "@/components/TopNav";
import Footer from "@/components/Footer";
import SubPageHeader from "@/components/SubPageHeader";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script"; // ✅ Add this import
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "EVM Utils",
    template: "%s | EVM Utils",
  },
  description: "Helper functions for Ethereum developers",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <GoogleAnalytics />
      </head>
      <body
        className={`${inter.className} relative min-h-screen flex flex-col antialiased text-[var(--color-text-primary)]`}
      >
        <Providers>
          <TopNav />
          <main className="flex-1 mt-14 py-16 px-5">
            <div className="max-w-[1200px] mx-auto w-full">
              <SubPageHeader />
              {children}
              <Analytics />
            </div>
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
