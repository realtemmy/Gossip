import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {};

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;
  //   Check if email exists, and if password matches hashedPassword

  const userExists = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!userExists) {
    return NextResponse.json(
      { error: "No user with email found" },
      { status: 404 }
    );
  }

  //   If user exists, compare passwords
  const passwordMatches = await bcrypt.compare(
    password,
    userExists.hashedPassword
  );
  if (!passwordMatches)
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });

  //   If password matches, sign in by generating a jwt token?
  //   return NextResponse.json(users);
};
