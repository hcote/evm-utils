import { ReactNode } from "react";

export default function Code({ children }: { children: ReactNode }) {
  return (
    <code className="text-[#964d4f] break-words whitespace-pre-wrap">
      {children}
    </code>
  );
}
