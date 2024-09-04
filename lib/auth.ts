import { AuthOptions, Session } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./db";
import { AdapterUser } from "next-auth/adapters";
import bcrypt from "bcrypt";
import { ErrorHandler } from "./error";
import { SignInSchema, SignUpSchema } from "./validators/auth.validators";
import { PASSWORD_HASH_SALT_ROUNDS } from "./constants/auth";

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
    CredentialsProvider({
      name: "signin",
      id: "signin",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        const result = SignInSchema.safeParse(credentials);

        if (!result.success) {
          throw new ErrorHandler(
            "Input Validation failed",
            "VALIDATION_ERROR",
            {
              fieldErrors: result.error.flatten().fieldErrors,
            }
          );
        }
        const { email, password } = result.data;
        const user = await prisma.user.findUnique({
          where: { email: email },
        });

        if (!user || !user.password)
          throw new ErrorHandler(
            "Email or password is incorrect",
            "AUTHENTICATION_FAILED"
          );

        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
          throw new ErrorHandler(
            "Email or password is incorrect",
            "AUTHENTICATION_FAILED"
          );
        }
        return user;
      },
    }),
    CredentialsProvider({
      name: "signup",
      id: "signup",
      credentials: {
        name: { label: "Name", type: "text" },
        email: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        const result = SignUpSchema.safeParse(credentials);

        if (!result.success) {
          throw new ErrorHandler(
            "Input Validation failed",
            "VALIDATION_ERROR",
            {
              fieldErrors: result.error.flatten().fieldErrors,
            }
          );
        }
        const { email, password } = result.data;
        const userExist = await prisma.user.findUnique({
          where: { email: email },
          select: { id: true, name: true, password: true },
        });

        if (userExist)
          throw new ErrorHandler(
            "User with this email already exist",
            "CONFLICT"
          );

        const hashedPassword = await bcrypt.hash(
          password,
          PASSWORD_HASH_SALT_ROUNDS
        );
        const user = await prisma.user.create({
          data: {
            email: email,
            password: hashedPassword,
          },
        });

        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        return {
          ...token,
          ...session.user,
        };
      }
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.picture = user.image;
      }
      return token;
    },
    session({ session, token }) {
      if (token && session && session.user) {
        session.user.id = token.id;
        session.user.image = token.picture || "";
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};
