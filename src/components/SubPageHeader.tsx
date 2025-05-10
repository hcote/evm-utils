"use client";

import { usePathname } from "next/navigation";
import { NAVIGATION } from "@/constants/navigation";

export default function SubPageHeader() {
  const pathname = usePathname();
  const page = NAVIGATION.find((nav) => nav.path === pathname);

  if (!page) return null;

  const { name, shortDesc } = page;

  return (
    <div className="flex items-center justify-center mb-2">
      <div className="max-w-[24rem] w-full text-center">
        <h1 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-2">
          {name}
        </h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
          {shortDesc}
        </p>
      </div>
    </div>
  );
}
