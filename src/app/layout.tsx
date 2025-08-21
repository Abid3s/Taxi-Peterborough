import type { Metadata } from "next";
import "@fontsource/inter";
import "@fontsource-variable/manrope";
import NavBar from "@/components/NavBar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";


export const metadata: Metadata = {
  title: "Taxi Peterborough",
  description: "Airport Taxis from Peterborough – Fixed Fares, Pro Drivers, 24/7",
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
          "min-h-screen bg-background font-sans antialiased"
        )}
      >
        <div className="relative flex min-h-dvh flex-col brand-gradient">
          <NavBar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
