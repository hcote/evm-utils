"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto w-full border-t border-white/10 py-10 px-6 text-sm bg-[var(--color-bg)] text-[var(--color-text-secondary)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Left Side */}
        <div className="text-center md:text-left">
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

        {/* Right Side */}
        <div className="flex flex-col items-center md:items-end gap-2">
          <p className="text-xs text-[var(--color-text-secondary)]">
            © {year} EVM Utils
          </p>
        </div>
      </div>
    </footer>
  );
}
