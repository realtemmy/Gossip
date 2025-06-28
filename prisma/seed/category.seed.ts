import { Prisma, PrismaClient } from "../../app/generated/prisma";
import slugify from "slugify";



export const seedCategory = async (prisma: PrismaClient) => {
  const categoryData: Prisma.CategoryCreateInput[] = [];

  const toAdd = [
    {
      name: "celebrities",
      description: "Celebrities and their lives",
    },
    {
      name: "politics",
      description: "Political news and events",
    },
    {
      name: "sports",
      description: "Sports news and events",
    },
    {
      name: "technology",
      description: "Technology news and advancements",
    },
    {
      name: "entertainment",
      description: "Entertainment news and events",
    },
    {
        name: "books and literature",
        description: "Books, literature, and literary events",
    }
  ];
  toAdd.forEach((category) => {
    categoryData.push({
      name: category.name,
      description: category.description,
      slug: slugify(category.name, { lower: true }),
    });
  });

  await prisma.category.createMany({
    data: categoryData,
    skipDuplicates: true,
  });
};
