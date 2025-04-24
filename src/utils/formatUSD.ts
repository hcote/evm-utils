export function formatUSD(value: string | number): string {
    const num = typeof value === "string" ? Number(value) : value;
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  }
  