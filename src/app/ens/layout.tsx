import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ENS Lookup",
  description: "Resolve Ethereum Name Service domains to addresses",
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return children;
}
