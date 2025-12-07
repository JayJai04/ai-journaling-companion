import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Journaling Companion",
  description: "Your personal AI-powered journaling companion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

