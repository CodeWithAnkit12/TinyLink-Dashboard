export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <img
        src="https://illustrations.popsy.co/gray/web-development.svg"
        alt="Empty"
        className="w-64 opacity-80"
      />

      <h2 className="text-2xl font-semibold mt-6 text-gray-700 dark:text-gray-300">
        No links yet
      </h2>

      <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-sm">
        Start by creating your first short link using the form above.
      </p>
    </div>
  );
}
