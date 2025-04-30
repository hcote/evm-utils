"use client";

import Header from "./Header";
import Dropdown from "./Dropdown";

export default function TopNav() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[var(--color-bg)] border-b border-white/10 backdrop-blur-md">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between p-5">
        <Header />
        <Dropdown />
      </div>
    </nav>
  );
}
