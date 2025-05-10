"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { NAVIGATION } from "@/constants/navigation";
import IcoChevronDown from "@/icons/IcoChevronDown";

export default function AboutPageDropdown() {
  const pathname = usePathname();
  const page = NAVIGATION.find((nav) => nav.path === pathname);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  if (!page) return null;

  const { longDesc } = page;

  return (
    <div className="flex items-center justify-center mb-12 overflow-y-auto">
      <div className="max-w-[30rem] w-full text-center">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="cursor-pointer text-sm mt-4 text-[var(--color-accent)] hover:bg-[var(--color-surface)] px-3 py-3 rounded-xl transition-colors inline-flex items-center"
        >
          Learn more about this page
          <span
            className={`ml-1 transform transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          >
            <IcoChevronDown size={16} />
          </span>
        </button>

        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden text-sm text-[var(--color-text-secondary)] text-left mt-2 ${
            open
              ? "max-h-[75vh] opacity-100 overflow-y-auto"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-2 py-1">{longDesc}</div>
        </div>
      </div>
    </div>
  );
}
