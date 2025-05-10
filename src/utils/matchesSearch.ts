export function matchesSearch(address: string, prefix: string, suffix: string, contains: string) {
  const lower = address.toLowerCase();
  return (
    (!prefix || lower.startsWith(`0x${prefix.toLowerCase()}`)) &&
    (!suffix || lower.endsWith(suffix.toLowerCase())) &&
    (!contains || lower.includes(contains.toLowerCase()))
  );
}
