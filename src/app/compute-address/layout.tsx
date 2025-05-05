import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compute Address",
  description:
    "Calculate the deployed-at address for a smart contract given a deployer address",
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return children;
}
