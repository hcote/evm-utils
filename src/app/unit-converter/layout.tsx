import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ETH Unit Converter",
  description: "Convert between Wei, Gwei, and ETH units",
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return children;
}
