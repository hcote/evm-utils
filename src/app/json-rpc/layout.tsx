import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON RPC",
  description: "Ethereum JSON RPC request sandbox",
  alternates: {
    canonical: "/json-rpc",
  },
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return children;
}
