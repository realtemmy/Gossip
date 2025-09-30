import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export const GET = async (request: NextRequest) => {
  const title = request.nextUrl.searchParams.get("title");
  const groupId = request.nextUrl.searchParams.get("groupId");

  const response = await prisma.conversation.findMany({
    where: {
      group_id: groupId ? Number(groupId) : undefined,
      title: title ? { contains: title, mode: "insensitive" } : undefined,
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
