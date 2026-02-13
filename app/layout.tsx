import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { GoogleTagManager } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });

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
      <body
        className={`${inter.className} antialiased bg-gradient-to-b from-gray-900 to-gray-800`}
      >
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#1f2937",
              color: "#fff",
              border: "1px solid #374151",
            },
            success: {
              iconTheme: {
                primary: "#eab308",
                secondary: "#000",
              },
            },
          }}
        />
        <GoogleTagManager gtmId="GTM-2WMMYXBEMC" />
      </body>
    </html>
  );
}
