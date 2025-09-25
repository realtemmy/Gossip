import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export const GET = async (
  req: NextRequest,
  { params }: { params: { groupId: number } }
) => {
  console.log(params);
  const { groupId } = await params;
  if (!groupId) {
    return NextResponse.json(
      { error: "Group ID is required." },
      { status: 400 }
    );
  }
  const response = prisma.conversation.findFirst({
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

export const POST = async (request: NextRequest) => {
  const { title, group_id } = await request.json();

  const response = await prisma.conversation.create({
    data: {
      title,
      group_id,
    },
  });

  return NextResponse.json(response, { status: 201 });
};
