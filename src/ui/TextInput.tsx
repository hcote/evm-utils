import { ChangeEvent } from "react";

interface TextInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  type?: string;
  id?: string;
  label?: string;
  size?: "md" | "sm";
}

export default function TextInput({
  value,
  onChange,
  placeholder = "",
  className = "",
  disabled = false,
  type = "text",
  id = "",
  label,
  size = "md",
}: TextInputProps) {
  const sizeClasses = size === "sm" ? "px-4 py-2 text-sm" : "p-2.5";
  return label ? (
    <div className="space-y-1">
      <label
        htmlFor={id}
        className={`block text-sm transition-opacity duration-200 ${
          value ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full ${sizeClasses} transition rounded-md bg-[var(--color-bg)] border border-[var(--color-text-secondary)] text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-text-primary)] disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      />
    </div>
  ) : (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`w-full ${sizeClasses} transition rounded-md bg-[var(--color-bg)] border border-[var(--color-text-secondary)] text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-text-primary)] disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    />
  );
}
