export default function Text({
  text,
  className = "",
  size = "md",
  variant = "primary",
  weight = "font-normal",
}: {
  text: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "error" | "success";
  weight?: string;
}) {
  const variantClasses: Record<typeof variant, string> = {
    primary: "text-[var(--color-text-primary)]",
    secondary: "text-[var(--color-text-secondary)]",
    error: "text-[var(--color-text-error)]",
    success: "text-[var(--color-green)]",
  };

  const sizeClasses: Record<typeof size, string> = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <p
      className={`${sizeClasses[size]} ${weight} ${variantClasses[variant]} ${className}`}
    >
      {text}
    </p>
  );
}
