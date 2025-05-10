"use client";

import { GOOGLE_ANALYTICS_KEY } from "@/constants/google-analytics";
import Script from "next/script";

export default function GoogleAnalyticScript() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_KEY}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GOOGLE_ANALYTICS_KEY}');
        `}
      </Script>
    </>
  );
}
