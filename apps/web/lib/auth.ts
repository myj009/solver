import { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@repo/db/client";
import bcrypt from "bcrypt";
import { ErrorHandler } from "@/lib/error";
import { SignInSchema, SignUpSchema } from "@/lib/validators/auth.validators";
import { PASSWORD_HASH_SALT_ROUNDS } from "@/lib/constants/auth";
import jwt from "jsonwebtoken";

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
    async signIn({ user, account }) {
      if (
        account &&
        (account.provider === "github" || account.provider === "google")
      ) {
        const { email, name, image } = user;
        let User;
        try {
          User = await prisma.user.findUnique({
            where: { email: email || "" },
          });
          if (!User) {
            User = await prisma.user.create({
              data: {
                email: email || "",
                name,
                image,
              },
            });
          } else {
            User = await prisma.user.update({
              where: { email: email || "" },
              data: { name, image },
            });
          }
          user.id = User?.id || "";
          user.name = User?.name || "";
          user.image = User?.image || "";
          user.email = User?.email || "";

          return true;
        } catch (error) {
          console.error("Error saving user to database:", error);
          return false;
        }
      }
      return true;
    },
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
        token.email = user.email || "";
        token.token = jwt.sign(
          {
            userId: user.id,
            email: user.email,
          },
          process.env.EXTERNAL_SECRET ?? "password",
          { expiresIn: "30d" }
        );
      }
      return token;
    },
    session({ session, token }) {
      if (token && session && session.user) {
        session.user.id = token.id;
        session.user.image = token.picture || "";
        session.user.email = token.email || "";
        session.user.token = token.token;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};
