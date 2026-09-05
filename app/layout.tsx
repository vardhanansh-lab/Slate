import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import SlateHeader from "@/components/SlateHeader";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-head",
  weight: ["500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Slate: AI video ad companion tools",
  description:
    "Plan structured ad hook variants and polish generated images, two lightweight companion tools for AI video ad creation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${inter.variable} antialiased bg-bg text-ink`}>
        <SlateHeader />
        {children}
      </body>
    </html>
  );
}
