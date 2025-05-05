import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON RPC Methods",
  description: "Interact with Ethereum nodes using JSON RPC methods",
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return children;
}
