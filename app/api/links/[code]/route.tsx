import { prisma } from "@/prisma/client";

type RouteProps = {
  params: Promise<{
    code: string;
  }>;
};

// GET /api/links/[code]
export async function GET(req: Request, props: RouteProps) {
  const { code } = await props.params; // ✅ FIX: params is a Promise

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

// DELETE /api/links/[code]
export async function DELETE(req: Request, props: RouteProps) {
  const { code } = await props.params; // ✅ FIX: params is a Promise

  try {
    await prisma.link.delete({
      where: { code },
    });

    return new Response(JSON.stringify({ message: "Deleted" }), {
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
    });
  }
}
