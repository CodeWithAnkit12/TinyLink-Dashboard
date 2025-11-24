import { prisma } from "@/prisma/client";
import type { NextRequest } from "next/server";

// GET /api/links/[code]
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ code: string }> }
) {
  const { code } = await context.params;

  const link = await prisma.link.findUnique({ where: { code } });

  if (!link) {
    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
    });
  }

  return Response.json(link);
}

// DELETE /api/links/[code]
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ code: string }> }
) {
  const { code } = await context.params;

  try {
    await prisma.link.delete({
      where: { code },
    });

    return Response.json({ message: "Deleted" });
  } catch {
    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
    });
  }
}
