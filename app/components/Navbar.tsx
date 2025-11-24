"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <nav className="w-full bg-white dark:bg-gray-900 shadow mb-8 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-blue-600 dark:text-blue-400"
        >
          TinyLink
        </Link>

        {/* Menu */}
        <div className="flex gap-6 text-lg items-center">

          <Link
            href="/"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Dashboard
          </Link>

          <Link
            href="/api/healthz"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Health
          </Link>

          <a
            href="https://github.com/CodeWithAnkit12/TinyLink-Dashboard"
            target="_blank"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            GitHub
          </a>

        </div>
      </div>
    </nav>
  );
}
