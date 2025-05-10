import { FormValues } from "@/hooks/use-unit-converter";

export const sanitizeUnitInput = (value: string, field: keyof FormValues): string => {
  // For wei, strip all non-digit characters (no decimals allowed)
  if (field === "wei") return value.replace(/\D/g, "");

  // For gwei and eth, allow digits and a single decimal point
  let sanitized = value.replace(/[^0-9.]/g, "");

  // Split on decimal points to ensure only one is allowed
  const parts = sanitized.split(".");
  if (parts.length > 2) {
    // Reconstruct with only the first decimal preserved, strip others
    sanitized = parts[0] + "." + parts.slice(1).join("").replace(/\./g, "");
  }

  return sanitized;
};
