import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Taxi Peterborough | Premium Airport Transfers",
  description: "Fixed fares for airport taxis to Heathrow, Gatwick, Luton, Stansted and more. Secure online payment and professional, licensed drivers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen font-sans antialiased",
          inter.className
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
