import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NFT Metadata",
  description: "Fetch and display metadata for any ERC-721 token",
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return children;
}
