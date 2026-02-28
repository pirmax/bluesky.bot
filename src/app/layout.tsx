import "@/styles/globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/app/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-full select-none flex-col`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
