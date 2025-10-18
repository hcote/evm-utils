import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contract Reader",
  description: "Query ethereum smart contract data",
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return children;
}
