"use client";

import { ThemeProvider } from "next-themes";
import { GoogleAnalytics } from "nextjs-google-analytics";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange>
      <GoogleAnalytics trackPageViews />
      {children}
    </ThemeProvider>
  );
}
