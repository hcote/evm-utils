import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Private Key Generator",
  description: "Ethereum private key generator",
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return children;
}
