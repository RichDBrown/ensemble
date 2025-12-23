import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import OGImage from "@/public/og.jpg";

const inter = Inter({
  weight: "variable",
  style: "normal",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ensemble-woad.vercel.app/"),
  title: "Ensemble — Never Cram Again",
  description:
    "Never cram again. Create a personalized study plan using proven learning science to help you retain more, stress less, and feel confident on exam day.",
  openGraph: {
    title: "Ensemble — Never Cram Again",
    description:
      "Never cram again. Create a personalized study plan using proven learning science to help you retain more, stress less, and feel confident on exam day.",
    type: "website",
    images: OGImage.src,
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
