export default function Footer() {
  return (
    <footer className="mt-16 py-6 border-t text-center text-gray-600 dark:text-gray-400">
      <p className="text-sm">
        Made with ❤️ by <span className="font-semibold">TinyLink</span>
      </p>
      <a
        href="https://github.com/"
        target="_blank"
        className="text-blue-600 dark:text-blue-400 underline text-sm"
      >
        View Source on GitHub
      </a>
      <p className="text-xs mt-2">
        © {new Date().getFullYear()} TinyLink. All rights reserved.
      </p>
    </footer>
  );
}
