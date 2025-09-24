import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma";

export const GET = async (
  request: NextRequest,
  { params }: { params: { conversationId: string } }
) => {
  const { conversationId } = await params;

  if (!conversationId) {
    return NextResponse.json(
      { error: "Conversation ID is required" },
      { status: 400 }
    );
  }

  const messages = await prisma.message.findMany({
    where: { conversationId: parseInt(conversationId, 10) },
  });

  return NextResponse.json(messages, { status: 200 });
};
