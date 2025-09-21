import { Prisma, PrismaClient } from "@/generated/prisma";
import { seedCategory } from "./seed/category.seed";
import { seedUsers } from "./seed/user.seed";
import { seedConversations } from "./seed/conversation.seed";
import { seedMessages } from "./seed/message.seed";
import { seedGroup } from "./seed/group.seed";

const prisma = new PrismaClient();

async function main() {
  // await seedCategory(prisma);
  // await seedGroup(prisma);
  await seedUsers(prisma);
  // await seedConversations(prisma);
  // await seedMessages(prisma);
  
  console.log("Seeding completed successfully.");
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
