import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      image: string;
      email: string;
      token: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    image: string;
    email: string;
    token: string;
  }
}
