import "./globals.css";

import type { Metadata } from "next";
import { Inter_Tight, Space_Grotesk } from "next/font/google";
import { Providers } from "@/components/Providers";
import { Navbar } from "./(landingPage)/_components/Navbar";
import { Footer } from "./(landingPage)/_components/Footer";

import NextTopLoader from "nextjs-toploader";

const inter = Inter_Tight({
  weight: "variable",
  variable: "--font-inter",
  subsets: ["latin"],
});
const space_grotesk = Space_Grotesk({
  weight: "variable",
  variable: "--font-space_grotesk",
  subsets: ["latin"],
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
    <html lang="en">
      <body
        className={`${space_grotesk.className} ${space_grotesk.variable} bg-white`}
      >
        <NextTopLoader color="#4e342e" showSpinner={false} shadow={false} />
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
