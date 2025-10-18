import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ENS Lookup",
  description: "ENS ethereum name service lookup",
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return children;
}
