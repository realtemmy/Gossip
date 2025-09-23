export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export const GET = async (
  req: NextRequest,
  { params }: { params: { groupId: string } }
) => {
  console.log("Params: ", params);
  const { groupId } = params;
  if (!groupId) {
    return NextResponse.json(
      { error: "Group ID is required." },
      { status: 400 }
    );
  }
  const response = await prisma.conversation.findFirst({
    where: {
      group_id: Number(groupId),
    },
  });

  if (!response) {
    return NextResponse.json(
      { error: `Conversation with group ID '${groupId}' not found.` },
      { status: 404 }
    );
  }

  return NextResponse.json(response, { status: 200 });
};
