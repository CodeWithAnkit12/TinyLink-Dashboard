"use client";

import { useEffect, useState } from "react";
import Spinner from "./components/Spinner";
import EmptyState from "./components/EmptyState";

type Link = {
  id: number;
  code: string;
  long_url: string;
  click_count: number;
  last_clicked: string | null;
  created_at: string;
};

export default function Home() {
  const [links, setLinks] = useState<Link[]>([]);
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingLinks, setLoadingLinks] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [search, setSearch] = useState("");

  async function loadLinks() {
    const res = await fetch("/api/links");
    const data = await res.json();
    setLinks(data);
    setLoadingLinks(false);
  }

  async function createLink() {
    if (!url.trim()) {
      setError("URL cannot be empty");
      return;
    }

    setLoading(true);
    setError("");

    const res = await fetch("/api/links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        long_url: url,
        code: code.trim() || undefined,
      }),
    });

    if (res.status === 409) setError("Short code already exists");
    else if (!res.ok) setError("Something went wrong");
    else {
      setUrl("");
      setCode("");
      loadLinks();
    }

    setLoading(false);
  }

  async function deleteLink(shortCode: string) {
    await fetch(`/api/links/${shortCode}`, { method: "DELETE" });
    loadLinks();
  }

  function copyLink(shortCode: string) {
    navigator.clipboard.writeText(`${window.location.origin}/${shortCode}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  useEffect(() => {
    loadLinks();
  }, []);

  const filteredLinks = links.filter(
    (l) =>
      l.code.toLowerCase().includes(search.toLowerCase()) ||
      l.long_url.toLowerCase().includes(search.toLowerCase())
  );

  if (loadingLinks) {
    return (
      <div className="p-8 max-w-5xl mx-auto">
        <Spinner />
        <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
          Loading links...
        </p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto font-sans">

      <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        TinyLink Dashboard
      </h1>

      {copied && (
        <div className="mb-4 p-3 bg-green-600 text-white rounded-lg w-fit text-sm animate-pulse">
          Copied!
        </div>
      )}

      {/* Input Card */}
      <div className="bg-white dark:bg-gray-800 shadow p-6 rounded-xl space-y-4 mb-10">
        <input
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 w-full p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Enter long URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <input
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 w-full p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Custom code (optional)"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        {error && <p className="text-red-600">{error}</p>}

        <button
          onClick={createLink}
          disabled={loading}
          className={`w-full px-6 py-3 text-white rounded-xl font-semibold flex justify-center transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? <Spinner /> : "Create Short Link"}
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by code or URL..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Table */}
      {filteredLinks.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow rounded-xl">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                <th className="p-4">Code</th>
                <th className="p-4">Original URL</th>
                <th className="p-4">Clicks</th>
                <th className="p-4">Last Clicked</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredLinks.map((l) => (
                <tr key={l.id} className="border-t border-gray-300 dark:border-gray-600">
                  <td className="p-4 text-gray-900 dark:text-gray-100 font-semibold">
                    {l.code}
                  </td>

                  <td className="p-4 max-w-xs truncate">
                    <a
                      href={l.long_url}
                      target="_blank"
                      className="text-blue-600 dark:text-blue-400 underline"
                    >
                      {l.long_url}
                    </a>
                  </td>

                  <td className="p-4 text-gray-900 dark:text-gray-100">
                    {l.click_count}
                  </td>

                  <td className="p-4 text-gray-900 dark:text-gray-100">
                    {l.last_clicked ?? "Never"}
                  </td>

                  <td className="p-4 flex gap-3">
                    <button
                      onClick={() => copyLink(l.code)}
                      className="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg"
                    >
                      Copy
                    </button>

                    <button
                      onClick={() => (window.location.href = `/code/${l.code}`)}
                      className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg"
                    >
                      Stats
                    </button>

                    <button
                      onClick={() => deleteLink(l.code)}
                      className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
