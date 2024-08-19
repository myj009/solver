import { AuthOptions, Session } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./db";
import { JWT } from "next-auth/jwt";
import { User } from "@prisma/client";
import { AdapterUser } from "next-auth/adapters";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({
      token,
      user,
      session,
    }: {
      token: JWT;
      user: AdapterUser;
      session: Session;
    }) {
      session.user.id = user.id;
      console.log(user, session);
      return session;
    },
  },
};
