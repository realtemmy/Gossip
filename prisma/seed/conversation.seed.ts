import { Prisma, PrismaClient } from "@/generated/prisma";
import slugify from "slugify";

const prisma = new PrismaClient();
export async function seedConversations(prisma: PrismaClient) {
  const conversationData: Prisma.ConversationCreateInput[] = [];

  const toAdd = [
    {
      title: "General Discussion",
      participants: [1, 4],
    },
    {
      title: "D6 Gist",
      participants: [1, 4],
    },
    {
      title: "Technology Talk",
      participants: [1, 4],
    },
  ];

  toAdd.forEach((conversation) => {
    conversationData.push({
      title: conversation.title,
    });
  });

  await prisma.conversation.createMany({
    data: conversationData,
  });
}
