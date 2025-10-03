import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export const GET = async (
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) => {
  const { id } = await context.params;
  // console.log("Fetching category with name:", id);

  if (!id) {
    return NextResponse.json(
      { error: `Category with ID: ${id} not found.` },
      { status: 400 }
    );
  }

  try {
    const category = await prisma.category.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        groups: true,
      },
    });

    if (!category) {
      return NextResponse.json(
        { error: `Category with ID: ${id} not found.` },
        { status: 404 }
      );
    }

    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.error("Error fetching category:", error);
    return NextResponse.json(
      { error: "Failed to fetch category." },
      { status: 500 }
    );
  }
};
