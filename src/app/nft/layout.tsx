import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NFT Metadata",
  description: "Fetch ERC-721 NFT token metadata",
  alternates: {
    canonical: "/nft",
  },
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return children;
}
