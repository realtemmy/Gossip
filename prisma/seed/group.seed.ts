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
      category: 3,
      name: "Global Politics",
      lastActive: "4m ago",
      verified: true,
    },
    {
      category: 3,
      name: "Policy Discussions",
      lastActive: "12m ago",
    },
    {
      category: 3,
      name: "Election Updates",
      lastActive: "8m ago",
      trending: true,
    },
    {
      category: 3,
      name: "Political Theory",
      lastActive: "35m ago",
    },
    {
      category: 3,
      name: "Local Government",
      lastActive: "2h ago",
    },
    {
      category: 4,
      name: "RPG Masters",
      trending: true,
    },
    {
      category: 4,
      name: "FPS Arena",
      lastActive: "2m ago",
      verified: true,
    },
    {
      category: 4,
      name: "Indie Game Lovers",
      members: 12456,
    },
    {
      category: 4,
      name: "Retro Gaming",
    },
    {
      category: 4,
      name: "Mobile Gaming",
    },
    {
      category: 5,
      name: "Computer Science Hub",
      verified: true,
    },
    {
      category: 5,
      name: "Language Exchange",
      trending: true,
    },
    { category: 5, name: "Study Groups" },
    {
      category: 5,
      name: "Online Courses",
    },
    {
      category: 5,
      name: "Academic Research",
    },
    {
      category: 6,
      name: "Startup Founders",
      verified: true,
    },
    {
      category: 6,
      name: "Marketing Strategies",
    },
    {
      category: 6,
      name: "Freelancers United",
      trending: true,
    },
    {
      category: 6,
      name: "Investment Club",
    },
    {
      category: 6,
      name: "Remote Work Tips",
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
