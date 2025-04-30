import { JSX } from "react";

export interface ResultItem {
  header: string;
  text: string | JSX.Element;
  className?: string;
}

interface ResultDisplayProps {
  items: ResultItem[];
}

export default function ResultDisplay({ items }: ResultDisplayProps) {
  return (
    <div className="mt-4 p-4 bg-[var(--color-bg)] rounded-md border border-[var(--color-text-secondary)] space-y-4 overflow-x-auto">
      {items.map((item, idx) => (
        <div key={idx}>
          <h2 className="text-sm font-semibold mb-1 text-[var(--color-text-secondary)]">
            {item.header}
          </h2>
          <div
            className={`text-sm break-words font-mono text-[var(--color-text-primary)] ${
              item.className ?? ""
            }`}
          >
            {typeof item.text === "string" ? (
              <pre className="whitespace-pre-wrap break-words">{item.text}</pre>
            ) : (
              item.text
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
