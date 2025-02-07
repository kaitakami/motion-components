import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarWrapper } from "@/components/layout/sidebar-wrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Motion Components",
  description: "Beautiful motion components for your React applications",
  openGraph: {
    title: "Motion Components",
    description: "Beautiful motion components for your React applications",
    url: "https://motion-components.vercel.app",
    siteName: "Motion Components",
    images: [
      { url: "https://motion-components.vercel.app/og.png" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Motion Components",
    description: "Beautiful motion components for your React applications",
    images: ["https://motion-components.vercel.app/og.png"],
  },
  other: {
    "whatsapp-catalog-message": "Beautiful motion components for your React applications",
    "whatsapp-catalog-image": "https://motion-components.vercel.app/og.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="h-screen flex bg-white dark:bg-black relative">
          <SidebarWrapper />
          <main className="flex-1 overflow-auto bg-gray-50 dark:bg-neutral-900 flex flex-col pt-16 md:pt-0">
            {children}
            <footer className="mt-auto py-4 px-8 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-neutral-800">
              Not affiliated with the Motion team
            </footer>
          </main>
        </div>
      </body>
    </html>
  );
}
