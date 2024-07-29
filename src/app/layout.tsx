import "./globals.css";

import type { Metadata } from "next";
import localfont from "next/font/local";
import { Providers } from "@/components/Providers";
import { Navbar } from "./(landingPage)/_components/Navbar";

import NextTopLoader from "nextjs-toploader";
import { Footer } from "./(landingPage)/_components/Footer";

const clashGrotesk = localfont({
  src: "./ClashGrotesk-Variable.ttf",
  variable: "--font-clash_grotesk",
});

const satoshi = localfont({
  src: "./Satoshi-Variable.ttf",
  variable: "--font-satoshi",
});

export const metadata: Metadata = {
  title: "Litlang",
  description:
    "Providing students the comprehensive notes for the academic excellence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${satoshi.className} ${satoshi.variable} ${clashGrotesk.variable} bg-white `}
      >
        <NextTopLoader color="#A86541" showSpinner={false} shadow={false} />
        <Providers>
          <Navbar />

          <main>{children}</main>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}
