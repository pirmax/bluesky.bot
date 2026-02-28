"use client";

import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "nextjs-google-analytics";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <VercelAnalytics />
      <GoogleAnalytics trackPageViews />
      {children}
    </>
  );
}
