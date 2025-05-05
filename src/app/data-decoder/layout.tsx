import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Decoder",
  description: "Make transaction data human-readable",
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return children;
}
