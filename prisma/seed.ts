import { Prisma, PrismaClient } from "../app/generated/prisma";
import { seedCategory } from "./seed/category.seed";

const prisma = new PrismaClient();

async function main() {
    await seedCategory(prisma);
    console.log("Seeding completed successfully.");
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
