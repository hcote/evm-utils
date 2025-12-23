import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ENS Lookup",
  description: "ENS ethereum name service lookup",
  alternates: {
    canonical: "/ens",
  },
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return children;
}
