interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "w-full max-w-none",
};

export default function Container({
  children,
  className = "",
  size = "md",
}: ContainerProps) {
  return (
    <div
      className={`p-8 space-y-5 bg-[var(--color-surface)] text-[var(--color-text-primary)] mx-auto rounded-2xl shadow-lg ${sizeClasses[size]} ${className}`}
    >
      {children}
    </div>
  );
}
