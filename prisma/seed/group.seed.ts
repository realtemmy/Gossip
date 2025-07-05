import { Prisma, PrismaClient } from "@/generated/prisma";
import slugify from "slugify";

const parseRelativeTime = (str: string | undefined): Date => {
  const now = new Date();
  if (!str) return now;

  const regex = /^(\d+)([smhd])\s*ago$/i; // e.g. 2m ago, 5h ago
  const match = str.match(regex);
  if (!match) return now;

  const value = parseInt(match[1], 10);
  const unit = match[2];

  switch (unit) {
    case "s":
      return new Date(now.getTime() - value * 1000);
    case "m":
      return new Date(now.getTime() - value * 60 * 1000);
    case "h":
      return new Date(now.getTime() - value * 60 * 60 * 1000);
    case "d":
      return new Date(now.getTime() - value * 24 * 60 * 60 * 1000);
    default:
      return now;
  }
};

export const seedGroup = async (prisma: PrismaClient) => {
  const groupData: Prisma.GroupCreateManyInput[] = [];
  const toAdd = [
    {
      name: "Fitness Enthusiasts",
      lastActive: "2m ago",
      category: 1,
      trending: true,
    },
    {
      name: "Healthy Cooking",
      members: 8934,
      category: 1,
      lastActive: "5m ago",
    },
    {
      name: "Travel Stories",
      lastActive: "1h ago",
      category: 1,
      verified: true,
    },
    {
      name: "Minimalist Living",
      lastActive: "3h ago",
      category: 1,
    },
    {
      name: "Photography Tips",
      lastActive: "45m ago",
      category: 1,
    },
  ];

  toAdd.forEach((group) => {
    groupData.push({
      name: group.name,
      slug: slugify(group.name, { lower: true }),
      categoryId: group.category || 1,
      members: group.members || 0,
      lastActive: parseRelativeTime(group.lastActive),
      trending: group.trending || false,
      verified: group.verified || false,
    });
  });

  await prisma.group.createMany({
    data: groupData,
    skipDuplicates: true,
  });
};
