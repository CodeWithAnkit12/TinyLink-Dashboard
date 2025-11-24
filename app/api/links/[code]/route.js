import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(_, { params }) {
  const { code } = params;

  const link = await prisma.link.findUnique({
    where: { code },
  });

  if (!link) {
    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
    });
  }

  return Response.json(link);
}

export async function DELETE(_, { params }) {
  const { code } = params;

  try {
    await prisma.link.delete({
      where: { code },
    });

    return new Response(JSON.stringify({ message: "Deleted" }), {
      status: 200,
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
    });
  }
}
