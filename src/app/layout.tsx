import type { Metadata } from "next";
import Providers from "./providers";
import TopNav from "@/components/TopNav";
import Footer from "@/components/Footer";
import SubPageHeader from "@/components/SubPageHeader";
import { Inter } from "next/font/google";
import "./globals.css";

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
      <body
        className={`${inter.className} relative min-h-screen flex flex-col antialiased text-[var(--color-text-primary)]`}
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
