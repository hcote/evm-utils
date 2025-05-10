export function formatUSD(value: string | number): string {
    const num = typeof value === "string" ? Number(value) : value;
    if (isNaN(num)) return value.toString();
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  }
  