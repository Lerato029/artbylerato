import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Art by Lerato | Portrait Artist",
  description:
    "Contemporary portrait paintings and illustrations by Lerato Nyalungu, celebrating African identity, culture, and belonging.",
  openGraph: {
    title: "Art by Lerato | Portrait Artist",
    description:
      "Contemporary portrait paintings and illustrations celebrating African identity, culture, and belonging.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
