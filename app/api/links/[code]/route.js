import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  try {
    const link = await prisma.link.findUnique({
      where: { code: params.code },
    });

    if (!link) {
      return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });
    }

    return Response.json(link);
  } catch (err) {
    console.error("API ERROR:", err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await prisma.link.delete({
      where: { code: params.code },
    });

    return Response.json({ message: "Deleted" });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });
  }
}
