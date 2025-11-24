import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const prisma = new PrismaClient();

export default async function StatsPage({
  params,
}: {
  params: { code: string };
}) {
  const code = params.code;

  const data = await prisma.link.findUnique({
    where: { code },
  });

  if (!data) {
    return (
      <div className="p-8 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Short Link Not Found</h1>

        <Link href="/" className="text-blue-600 underline text-lg">
          ← Back to Dashboard
        </Link>
      </div>
    );
  }

  const shortUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/${code}`;

  // Basic chart data (you can expand this later to daily/hourly)
  const chartData = [
    { name: "Clicks", value: data.click_count },
  ];

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-10">
      <h1 className="text-4xl font-bold">Analytics</h1>

      {/* Analytics Card */}
      <div className="bg-white shadow rounded-xl p-6 space-y-6">
        <div>
          <p className="text-gray-500 text-sm">Short URL</p>
          <p className="text-xl font-semibold text-blue-600 break-all">
            {shortUrl}
          </p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Destination</p>
          <a
            href={data.long_url}
            target="_blank"
            className="text-blue-600 underline break-all"
          >
            {data.long_url}
          </a>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="text-3xl font-bold">{data.click_count}</p>
            <p className="text-gray-600 text-sm">Total Clicks</p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-semibold">
              {data.last_clicked
                ? new Date(data.last_clicked).toLocaleString()
                : "Never"}
            </p>
            <p className="text-gray-600 text-sm">Last Clicked</p>
          </div>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Created</p>
          <p className="font-semibold">
            {new Date(data.created_at).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Analytics Chart */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Click Analytics</h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid stroke="#e5e7eb" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#2563eb"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <Link
          href="/"
          className="px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-lg"
        >
          ← Back
        </Link>

        <a
          href={`/${code}`}
          target="_blank"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
        >
          Visit Short URL
        </a>
      </div>
    </div>
  );
}
