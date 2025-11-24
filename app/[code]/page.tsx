import { redirect } from "next/navigation";
import { prisma } from "@/prisma/client";

type PageProps = {
  params: Promise<{
    code: string;
  }>;
};

export default async function RedirectPage({ params }: PageProps) {
  // ⛔ FIX: params is a Promise in Next.js 16 → MUST await it
  const { code } = await params;

  if (!code) {
    return <h1>Invalid short code</h1>;
  }

  // Fetch target URL
  const link = await prisma.link.findUnique({
    where: { code },
  });

  if (!link) {
    return <h1>404 – Link not found</h1>;
  }

  // Update analytics
  await prisma.link.update({
    where: { code },
    data: {
      click_count: { increment: 1 },
      last_clicked: new Date(),
    },
  });

  // Redirect
  return redirect(link.long_url);
}
