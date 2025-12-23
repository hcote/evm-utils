import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Decoder",
  description: "Decode ethereum transaction data",
  alternates: {
    canonical: "/data-decoder",
  },
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return children;
}
