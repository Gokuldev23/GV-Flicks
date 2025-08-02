import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GV-Flicks",
  description: `Your ultimate movie search companion, built with Next.js and powered by TMDB.
     Discover trending films, deep-dive into cast & crew, and find your next binge — all with blazing-fast performance and modern design.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased bg-gradient-to-b from-gray-900 to-gray-800`}>{children}</body>
    </html>
  );
}
