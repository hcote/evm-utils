import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON RPC",
  description: "Send JSON RPC requests to EVM nodes",
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return children;
}
