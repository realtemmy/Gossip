import { Prisma, PrismaClient } from "@/generated/prisma";

export async function seedConversations(prisma: PrismaClient) {
  const conversationData: Prisma.ConversationCreateManyInput[] = [];

  const toAdd = [
    {
      title: "General Discussion",
      groupId: 1,
    },
    {
      title: "D6 Gist",
      groupId: 1,
    },
    {
      title: "Technology Talk",
      groupId: 1,
    },
  ];

  toAdd.forEach((conversation) => {
    conversationData.push({
      group_id: conversation.groupId,
      title: conversation.title,
    });
  });

  await prisma.conversation.createMany({
    data: conversationData,
    skipDuplicates: true,
  });
  // await prisma.conversation.deleteMany();
}
