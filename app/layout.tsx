import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import Appbar from "@/components/Appbar";
import Providers from "./providers";

const fontHeading = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Solver",
  description: "Find Solana talent. Find Solana work",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body
          className={cn("antialiased", fontHeading.variable, fontBody.variable)}
        >
          <Appbar />
          <div className="mt-16">{children}</div>
        </body>
      </Providers>
    </html>
  );
}
