import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import slugify from "slugify";

const prisma = new PrismaClient();
export const GET = async (req: NextRequest) => {
  try {
    const groups = await prisma.group.findMany({
      select: {
        name: true,
        id: true,
      },
    });

    return NextResponse.json(groups, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: `Failed to fetch groups: ${errorMessage}` },
      { status: 500 }
    );
  }
};

export const POST = async (request: NextRequest) => {
  const { name, categoryId } = await request.json();
  if (!name || !categoryId) {
    return NextResponse.json(
      { error: "Name or category not provided" },
      { status: 400 }
    );
  }

  const response = await prisma.group.create({
    data: {
      name,
      categoryId,
      slug: slugify(name, { lower: true }),
    },
  });

  return NextResponse.json(response, { status: 201 });
};
