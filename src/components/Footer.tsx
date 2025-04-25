export default function Footer() {
  return (
    <footer className="mt-16 py-6 text-center text-sm text-[var(--color-text-secondary)]">
      Have suggestions for new utilities?{" "}
      <a
        href="https://github.com/hcote/evm-utils/issues"
        target="_blank"
        className="underline hover:text-[var(--color-text-primary)]"
      >
        Get in touch
      </a>
      .
    </footer>
  );
}
