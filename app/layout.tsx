import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/components/AppProvider";
import { TopBar } from "@/components/TopBar";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GF2 Tools",
  description: "GF2 Tools, calculators and tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn("antialiased", geistSans.variable, geistMono.variable)}
      >
        <AppProvider>
          <TopBar />
          <main className="flex flex-col items-center py-8">
            <div className="container flex-1 px-2">{children}</div>
          </main>
          <Toaster />
        </AppProvider>
      </body>
    </html>
  );
}
