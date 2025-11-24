import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Correct type for dynamic route params
type PageProps = {
  params: Promise<{
    code: string;
  }>;
};

export default async function RedirectPage({ params }: PageProps) {
  const { code } = await params; // FIX: params is a Promise

  if (!code) {
    return <h1>Invalid short code</h1>;
  }

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

  // Redirect to the long URL
  redirect(link.long_url);
}
