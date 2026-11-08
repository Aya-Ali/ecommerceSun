
import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AppPreferencesProvider } from "@/components/layout/app-preferences-provider";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import MySessionProvider from "@/components/layout/MySessionProvider";
import CartContextProvider from "@/context/CartContextProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FreshCart | Online Grocery Store",
  description: "Fresh groceries delivered to your door.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" dir="ltr" className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}>
      <body className="min-h-full flex flex-col">
        <MySessionProvider>
          <CartContextProvider>
            <AppPreferencesProvider>{children}</AppPreferencesProvider>
            <Toaster />
          </CartContextProvider>
        </MySessionProvider>


      </body>
    </html>
  );
}
