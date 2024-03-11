import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";

const lato = Lato({ weight: ["400", "700"], subsets: ["latin-ext"] });

export const metadata: Metadata = {
  title: "Volume Calculator",
  description: "calculate volume based on banner volume",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lato.className}>{children}</body>
    </html>
  );
}
