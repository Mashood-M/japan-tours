import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JAPAN TOURS — 10-Day Curated Journey",
  description: "A premium 10-day curated travel experience across Osaka, Kyoto, and Tokyo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
