"use client";

import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { ThemeProvider } from "next-themes";
import { GoogleAnalytics } from "nextjs-google-analytics";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange>
      <VercelAnalytics />
      <GoogleAnalytics trackPageViews />
      {children}
    </ThemeProvider>
  );
}
