"use server";

import { IChat } from "@/app/chat/types";
import { IChatWithMessages } from "@/app/chat/types";
import { authOptions } from "@/lib/auth";
import {
  ChannelWithUsers,
  ChannelWithUsersAndMessages,
} from "@/types/prisma-types";
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

const flattenChatsWithMessages = (
  chats: ChannelWithUsersAndMessages[],
  userId: string
): IChatWithMessages[] => {
  return chats.map((chat) => {
    const toUser =
      chat.UserChannels[0].userId == userId
        ? chat.UserChannels[1].user
        : chat.UserChannels[0].user;
    return {
      id: chat.id,
      toUser: toUser,
      messages: chat.Messages,
    };
  });
};

export async function getUserChatWithMessages(toUserId: string) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return null;
  }

  const chat: ChannelWithUsersAndMessages | null =
    await prisma.channel.findFirst({
      where: {
        AND: [
          {
            UserChannels: {
              some: {
                userId: session.user.id,
              },
            },
          },
          {
            UserChannels: {
              some: {
                userId: toUserId,
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
        Messages: true,
      },
    });

  if (!chat) {
    return null;
  }

  return flattenChatsWithMessages([chat], session.user.id)[0];
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
