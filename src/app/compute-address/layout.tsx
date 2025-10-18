import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compute Address",
  description: "Compute smart contract address from nonce",
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return children;
}
