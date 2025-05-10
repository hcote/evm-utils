"use client";

import { IS_PROD } from "@/constants/is-prod";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export default function GoogleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (IS_PROD && typeof window !== "undefined" && window.gtag) {
      window.gtag("config", "G-FRW5YBK09S", {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return null;
}
