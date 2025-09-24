import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma";

export const GET = async (request: NextRequest) => {
  const response = await prisma.message.findMany();
  return NextResponse.json(response, { status: 200 });
};

export const POST = async (request: NextResponse) => {
  const { content, senderId, conversationId } = await request.json();

  prisma.message.create({
    data: {
      content,
      senderId,
      conversationId,
      status: "SENT",
    },
  });
};
