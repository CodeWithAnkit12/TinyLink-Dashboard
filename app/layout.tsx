import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TinyLink - URL Shortener",
  description: "Fast and clean URL shortener dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-900 dark:text-white`}
      >
        <Navbar />

        {/* Main page content */}
        <main className="mt-6 px-4 max-w-6xl mx-auto">
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
