import { Prisma,PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function seedMessages(prisma: PrismaClient) {
    const messageData: Prisma.MessageCreateInput[] = [];
    const toAdd = [
        {
            content: "Hello, how are you?",
            conversationId: 1,
            senderId: 1,
        },
        {
            content: "I'm good, thanks! How about you?",
            conversationId: 1,
            senderId: 2,
        },
        {
            content: "Did you see the latest tech news?",
            conversationId: 2,
            senderId: 1,
        },
        {
            content: "Yes, it's fascinating!",
            conversationId: 2,
            senderId: 2,
        },
    ]
}