import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

/**
 * THEORY: Next.js Layout System
 * 
 * layout.tsx wraps ALL pages in the app/ directory and persists state/UI during navigation.
 * Unlike traditional React apps where the entire tree re-renders on route change,
 * layouts in Next.js are NOT re-mounted when navigating between pages that share the same layout.
 * This means:
 * - Header/Footer stay mounted (no flicker)
 * - Any state in the layout persists across page navigations
 * 
 * We use <Link> from next/link instead of <a> tags because:
 * - <Link> enables CLIENT-SIDE navigation (no full page reload)
 * - It pre-fetches linked pages in the background for instant navigation
 * - <a> tags cause a HARD reload, losing all client state and re-fetching everything
 */

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JobHunt Tracker | Next.js",
  description: "Track your job applications with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        {/* Navigation Header */}
        <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-sm">
          <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-lg font-bold text-emerald-700">
              JobHunt Tracker
            </Link>
            <div className="flex items-center gap-6">
              <Link
                href="/"
                className="text-sm font-medium text-zinc-600 transition hover:text-zinc-900"
              >
                Dashboard
              </Link>
              <Link
                href="/add"
                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
              >
                + Add Job
              </Link>
            </div>
          </nav>
        </header>

        {/* Page Content */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="border-t border-zinc-200 bg-zinc-50 py-6">
          <div className="mx-auto max-w-5xl px-6 text-center text-sm text-zinc-500">
            © {new Date().getFullYear()} JobHunt Tracker. Built with Next.js 14 (App Router).
          </div>
        </footer>
      </body>
    </html>
  );
}
