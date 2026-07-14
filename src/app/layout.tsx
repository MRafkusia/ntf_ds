import type { Metadata } from "next";
import { Newsreader, Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Notaflow — Design System",
  description:
    "Notaflow Design System v1.1 — Editorial Modern. Sophisticated, warm, earthy, editorial-yet-functional design tokens, components, and brand assets.",
  keywords: [
    "Notaflow",
    "Design System",
    "Design Tokens",
    "Editorial",
    "Brand Guidelines",
  ],
  authors: [{ name: "Notaflow" }],
  icons: {
    icon: "/logos/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${newsreader.variable} ${outfit.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
