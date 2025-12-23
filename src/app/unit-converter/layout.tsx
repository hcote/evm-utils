import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ETH Unit Converter",
  description: "Eth unit converter",
  alternates: {
    canonical: "/unit-converter",
  },
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return children;
}
