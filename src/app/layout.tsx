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

/**
 * TODO:
 * - mobile responsiveness (nav bar, apply slight padding to page)
 * - ensure consistent color usage across the app, no one-offs
 * - code cleanup...
 * - consider placing forms + ResultDisplay side by side for wider screens?
 * - SEO
 * - support prefix, contains, suffix for generated contract address
 * - extract <div> that's used across most/all of my forms into <Container>?
 *
 * - rpc requests page
 * - contract reader page
 */

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`relative min-h-screen flex flex-col ${geistSans.variable} ${geistMono.variable} antialiased text-[var(--color-text-primary)]`}
      >
        <Providers>
          <TopNav />
          <main className="flex-1 mt-14 py-16 px-5">
            <div className="max-w-[1200px] mx-auto w-full">
              <SubPageHeader />
              {children}
            </div>
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
