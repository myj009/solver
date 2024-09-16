import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import Appbar from "@/components/Appbar";
import Providers, { ThemeProvider } from "./providers";
import { Toaster } from "react-hot-toast";

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
    <html className="overflow-y-scroll no-scrollbar" lang="en">
      <Providers>
        <body
          className={cn(
            "antialiased min-h-screen",
            fontHeading.variable,
            fontBody.variable
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Appbar />
            <div className="pt-16 min-h-screen">{children}</div>
            <Toaster />
          </ThemeProvider>
        </body>
      </Providers>
    </html>
  );
}
