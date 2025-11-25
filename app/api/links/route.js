import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Generate a random short code
function generateCode(length = 6) {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export async function GET() {
  try {
    const links = await prisma.link.findMany({
      orderBy: { created_at: "desc" },
    });

    return Response.json(links);
  } catch (err) {
    console.error("API ERROR:", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    console.log("POST BODY =>", body);

    // Accept either url or long_url from frontend
    const long_url = body.long_url || body.url;

    if (!long_url) {
      return Response.json({ error: "URL is required" }, { status: 400 });
    }

    // Generate unique short code
    let code = generateCode();
    while (await prisma.link.findUnique({ where: { code } })) {
      code = generateCode();
    }

    const newLink = await prisma.link.create({
      data: {
        long_url, // matches Prisma schema
        code,     // required
      },
    });

    return Response.json(newLink, { status: 201 });
  } catch (err) {
    console.error("POST ERROR:", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
