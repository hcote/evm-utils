import { ChangeEvent } from "react";

interface TextAreaProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  rows?: number;
}

export default function TextArea({
  value,
  onChange,
  placeholder = "",
  className = "",
  disabled = false,
  rows = 3,
}: TextAreaProps) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      rows={rows}
      className={`w-full p-2.5 rounded-md bg-[var(--color-bg)] border border-[var(--color-text-secondary)] text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-text-primary)] disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    />
  );
}
