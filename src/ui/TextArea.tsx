import { ChangeEvent, useEffect, useRef } from "react";

interface TextAreaProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  rows?: number;
  autoResize?: boolean;
  minRows?: number;
}

export default function TextArea({
  value,
  onChange,
  placeholder = "",
  className = "",
  disabled = false,
  rows = 3,
  autoResize = false,
  minRows = 3,
}: TextAreaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (autoResize && textareaRef.current) {
      // Reset height to auto to get the correct scrollHeight
      textareaRef.current.style.height = "auto";

      // Calculate the number of lines
      const lineHeight = parseInt(
        getComputedStyle(textareaRef.current).lineHeight
      );
      const minHeight = lineHeight * minRows + 20; // 20px for padding

      // Set height based on content, but not less than minHeight
      const newHeight = Math.max(textareaRef.current.scrollHeight, minHeight);
      textareaRef.current.style.height = `${newHeight}px`;
    }
  }, [value, autoResize, minRows]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      rows={autoResize ? undefined : rows}
      style={autoResize ? { overflow: "hidden", resize: "none" } : undefined}
      className={`w-full p-2.5 rounded-md bg-[var(--color-bg)] border border-[var(--color-text-secondary)] text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-text-primary)] disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    />
  );
}
