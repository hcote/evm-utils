"use client";

import EthPrice from "./EthPrice";
import GasPrice from "./GasPrice";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto w-full border-t border-white/10 py-12 px-6 text-sm bg-[var(--color-bg)] text-[var(--color-text-secondary)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div className="flex-1 md:text-left text-center">
          <p>
            Have suggestions?{" "}
            <a
              href="https://github.com/hcote/evm-utils/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-[var(--color-text-primary)]"
            >
              Open an issue
            </a>
            .
          </p>
        </div>

        <div className="flex justify-center items-center gap-4">
          <EthPrice />
          <GasPrice />
        </div>

        <div className="flex-1 text-sm md:text-right text-center">
          © {year} EVM Utils by Hunter Cote
        </div>
      </div>
    </footer>
  );
}
