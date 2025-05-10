import { JSX } from "react";

export function highlightAddressParts(
  address: string,
  prefix: string,
  suffix: string,
  contains: string
): JSX.Element {
  const lower = address.toLowerCase();
  const p = prefix.toLowerCase();
  const s = suffix.toLowerCase();
  const c = contains.toLowerCase();

  const highlights: JSX.Element[] = [];
  let remaining = address;

  if (p && lower.startsWith(`0x${p}`)) {
    const prefixLen = 2 + p.length;
    highlights.push(
      <span key="prefix" className="text-[var(--color-purple)] font-semibold">
        {remaining.slice(0, prefixLen)}
      </span>
    );
    remaining = remaining.slice(prefixLen);
  }

  const lowerRem = remaining.toLowerCase();
  const containsIndex = c ? lowerRem.indexOf(c) : -1;
  if (containsIndex !== -1) {
    if (containsIndex > 0) {
      highlights.push(
        <span key="pre-contains">{remaining.slice(0, containsIndex)}</span>
      );
    }
    highlights.push(
      <span key="contains" className="text-red-400 font-semibold">
        {remaining.slice(containsIndex, containsIndex + c.length)}
      </span>
    );
    remaining = remaining.slice(containsIndex + c.length);
  }

  const lowerRem2 = remaining.toLowerCase();
  if (s && lowerRem2.endsWith(s)) {
    const suffixStart = remaining.length - s.length;
    if (suffixStart > 0) {
      highlights.push(<span key="mid">{remaining.slice(0, suffixStart)}</span>);
    }
    highlights.push(
      <span key="suffix" className="text-green-400 font-semibold">
        {remaining.slice(suffixStart)}
      </span>
    );
  } else {
    highlights.push(<span key="rest">{remaining}</span>);
  }

  return <span className="font-mono">{highlights}</span>;
}
