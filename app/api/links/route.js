import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const links = await prisma.link.findMany({
    orderBy: { created_at: "desc" },
  });

  return Response.json(links);
}

export async function POST(request) {
  try {
    const { code, long_url } = await request.json();

    if (!long_url) {
      return new Response(JSON.stringify({ error: "URL is required" }), {
        status: 400,
      });
    }

    // If no code provided → generate random 6-8 chars
    const shortCode =
      code ||
      Math.random().toString(36).substring(2, 8);

    const newLink = await prisma.link.create({
      data: {
        code: shortCode,
        long_url,
      },
    });

    return Response.json(newLink, { status: 201 });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Code already exists" }), {
      status: 409,
    });
  }
}
