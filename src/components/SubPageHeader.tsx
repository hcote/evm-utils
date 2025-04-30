"use client";

import { usePathname } from "next/navigation";
import { NAVIGATION } from "@/constants/navigation";

export default function SubPageHeader() {
  const pathname = usePathname();
  const page = NAVIGATION.find((nav) => nav.path === pathname);

  if (!page) return null;

  const { name, description } = page;

  return (
    <div className="flex items-center justify-center pb-6 mb-8">
      <div className="max-w-[24rem] w-full text-center">
        <h1 className="text-2xl font-semibold text-[var(--color-text-primary)]">
          {name}
        </h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
          {description}
        </p>
      </div>
    </div>
  );
}
