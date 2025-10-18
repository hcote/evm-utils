import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transaction Decoder",
  description: "Decode raw ethereum transaction",
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return children;
}
