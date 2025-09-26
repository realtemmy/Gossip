import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma";

export const GET = async (
  request: NextRequest,
  { params }: { params: { categoryId: string } }
) => {
  const { categoryId } = params;
  const response = await prisma.group.findMany({
    where: {
      categoryId: parseInt(categoryId),
    },
  });
  return NextResponse.json(response, { status: 200 });
};
