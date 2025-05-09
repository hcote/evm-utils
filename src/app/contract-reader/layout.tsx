import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contract Reader",
  description: "Read data from any Ethereum smart contract",
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return children;
}
