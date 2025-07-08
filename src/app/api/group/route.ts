import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();
export const GET = async (req: NextRequest) => {
  try {
    const groups = await prisma.group.findMany();

    return NextResponse.json(groups, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: `Failed to fetch groups: ${errorMessage}` },
      { status: 500 }
    );
  }
};
