interface ButtonProps {
  label: string;
  onClick: () => void;
  expand?: boolean;
  className?: string;
  disabled?: boolean;
  variant?: "primary" | "inverse";
  size?: "sm" | "md" | "lg";
}

const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2",
  lg: "px-6 py-3 text-lg",
};

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-[var(--color-accent)] text-black hover:opacity-85",
  inverse:
    "text-[var(--color-text-primary)] border border-white/10 hover:bg-[var(--color-btn-hover)]",
};

export default function Button({
  label,
  onClick,
  className = "",
  expand = false,
  disabled = false,
  variant = "primary",
  size = "md",
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`cursor-pointer font-semibold rounded-md active:scale-97 transition disabled:opacity-50 disabled:cursor-not-allowed 
        ${expand ? "w-full" : ""} 
        ${variantClasses[variant]} 
        ${sizeClasses[size]} 
        ${className}`}
    >
      {label}
    </button>
  );
}
