import type { Metadata } from "next";
import "@fontsource/inter";
import "@fontsource-variable/manrope";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";


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
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
