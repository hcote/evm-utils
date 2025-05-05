import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Private Key Generator",
  description:
    "Generate a random EVM private key and address, with support for vanity prefixes or suffixes",
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return children;
}
