"use client";

import Header from "./Header";
import GasPrice from "./GasPrice";
import EthPrice from "./EthPrice";
import Dropdown from "./Dropdown";

export default function Navbar() {
  return (
    <nav
      className="w-full flex items-center justify-between px-6 py-4"
      style={{
        backgroundColor: "var(--color-bg)",
        color: "var(--color-text-primary)",
      }}
    >
      <Header />
      <div className="flex items-center gap-8">
        <EthPrice />
        <GasPrice />
        <Dropdown />
      </div>
    </nav>
  );
}
