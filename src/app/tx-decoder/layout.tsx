import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transaction Decoder",
  description: "Decode a raw EVM transaction to view its contents",
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return children;
}
