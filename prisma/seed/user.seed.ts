import { Prisma,PrismaClient } from "@/generated/prisma";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const seedUsers = async (prisma: PrismaClient) => {
  let usersData: Prisma.UserCreateInput[] = [];

  const toAdd = [
    {
      username: "realtemmy",
      email: "temiloluwaogunti8@gmail.com",
      password: "test1234",
    },
    {
      username: "temiloluwa",
      email: "temmy4jamb@gmail.com",
      password: "test1234",
    },
  ];

  usersData = await Promise.all(
    toAdd.map(async (user) => ({
      username: user.username,
      email: user.email,
      hashedPassword: await bcrypt.hash(user.password, 10),
    }))
  );

  await prisma.user.createMany({
    data: usersData,
    skipDuplicates: true,
  });
};
