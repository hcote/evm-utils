"use client";

import Header from "./Header";
import GasPrice from "./GasPrice";
import EthPrice from "./EthPrice";

export default function TopNav() {
  return (
    <nav
      className="w-full flex items-center justify-between p-5"
      style={{
        backgroundColor: "var(--color-surface)",
        color: "var(--color-text-primary)",
      }}
    >
      <Header />
      <div className="flex items-center gap-8">
        <EthPrice />
        <GasPrice />
      </div>
    </nav>
  );
}
