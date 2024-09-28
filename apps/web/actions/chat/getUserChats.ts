"use server";

import { IChat } from "@/app/chat/layout";
import { authOptions } from "@/lib/auth";
import { ChannelWithUsers } from "@/types/prisma-types";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";

const flattenChats = (chats: ChannelWithUsers[], userId: string): IChat[] => {
  return chats.map((chat) => {
    const toUser =
      chat.UserChannels[0].userId == userId
        ? chat.UserChannels[1].user
        : chat.UserChannels[0].user;
    return {
      id: chat.id,
      toUser: toUser,
    };
  });
};

export async function getUserChat(user1: string, user2: string) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return null;
  }

  const chat: ChannelWithUsers | null = await prisma.channel.findFirst({
    where: {
      AND: [
        {
          UserChannels: {
            some: {
              userId: user1,
            },
          },
        },
        {
          UserChannels: {
            some: {
              userId: user2,
            },
          },
        },
      ],
    },
    include: {
      UserChannels: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
        },
      },
    },
  });

  if (!chat) {
    return null;
  }

  return flattenChats([chat], session.user.id)[0];
}

export async function getUserChats() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return null;
  }

  const chats: ChannelWithUsers[] = await prisma.channel.findMany({
    where: {
      UserChannels: {
        some: {
          userId: session.user.id,
        },
      },
    },
    include: {
      UserChannels: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
        },
      },
    },
  });

  console.log(chats);

  return flattenChats(chats, session.user.id);
}
