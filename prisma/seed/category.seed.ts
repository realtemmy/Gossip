import { Prisma,PrismaClient } from "@/generated/prisma";

export const seedCategory = async (prisma: PrismaClient) => {
  const categoryData: Prisma.CategoryCreateInput[] = [];

  const toAdd = [
    {
      name: "Lifestyle",
      icon: "Users",
      color: "green",

    },
    {
      name: "Celebrities",
      icon: "Star",
      color: "yellow",

    },
    {
      name: "Politics",
      icon: "Vote",
      color: "blue",

    },
    {
      name: "Gaming",
      icon: "Gamepad2" ,
      color: "green",

    },
    {
      name: "Education",
      icon: "GraduationCap" ,
      color: "indigo",

    },
    {
      name: "Business",
      icon: "Briefcase" ,
      color: "orange",
    },
  ];

// }
  toAdd.forEach((category) => {
    categoryData.push({
      name: category.name,
      icon: category?.icon,
      color: category?.color,
    });
  });

  await prisma.category.createMany({
    data: categoryData,
    skipDuplicates: true,
  });
};
