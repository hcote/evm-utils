"use client";

import { GOOGLE_ANALYTICS_KEY } from "@/constants/google-analytics";
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
      window.gtag("config", GOOGLE_ANALYTICS_KEY, {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return null;
}
