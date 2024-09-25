"use server";

import { IChat } from "@/app/chat/layout";
import { authOptions } from "@/lib/auth";
import { ChannelWithUsers } from "@/types/prisma-types";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";

export async function getUserChats() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return null;
  }

  const flattenChats = (chats: ChannelWithUsers[]): IChat[] => {
    return chats.map((chat) => {
      const toUser =
        chat.UserChannels[0].userId == session.user.id
          ? chat.UserChannels[1].user
          : chat.UserChannels[0].user;
      return {
        id: chat.id,
        user: toUser,
      };
    });
  };

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

  return flattenChats(chats);
}
