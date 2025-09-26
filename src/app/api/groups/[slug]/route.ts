import { PrismaClient } from "@/generated/prisma";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// Get Groupbu slug
export const GET = async (
  req: NextRequest,
  { params }: { params: { slug: string } }
) => {
  const { slug } = await params;
  if (!slug) {
    return NextResponse.json(
      { error: "Group slug is required." },
      { status: 400 }
    );
  }
  const response = await prisma.group.findFirst({
    where: {
      slug: slug,
    },
    include: {
      conversations: true,
    },
  });

  if (!response) {
    return NextResponse.json(
      { error: `Group with slug '${slug}' not found.` },
      { status: 404 }
    );
  }

  return NextResponse.json(response, { status: 200 });
};
