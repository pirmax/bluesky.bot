import "@/styles/globals.css";

import clsx from "clsx";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/app/providers";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Claim your bluesky.bot handle today and stand out on Bluesky!",
  description:
    "Follow the instructions to get your own bluesky.bot handle and stand out on Bluesky!",
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || "http://localhost:3000"),
  openGraph: {
    siteName: "Bluesky.bot",
    url: process.env.NEXT_PUBLIC_URL || "http://localhost:3000",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Bluesky.bot - Claim your handle on Bluesky",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={clsx("h-full antialiased", geist.variable, geistMono.variable)}
      suppressHydrationWarning
    >
      <body className="flex min-h-full select-none flex-col bg-white dark:bg-gray-950">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
