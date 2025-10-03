export const runtime = "nodejs";

import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";

import { prisma } from "./prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, Facebook],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async session({ session, user }) {
      // console.log("Auth: ", session, user);
      return {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          verified: user.verified
        },
        expires: session.expires,
      };
    },
  },
});
