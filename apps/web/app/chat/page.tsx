import { Chat } from "@/components/chat/chat";
import { userData } from "@/lib/chat-data";
import { IChat } from "./layout";
import React from "react";
import { getUserChat } from "@/actions/chat/getUserChats";
import { getUserMin } from "@/actions/user/getUser";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Message } from "@prisma/client";
import { getChatMessages } from "@/actions/chat/getChatMessages";

const ChatPage = async ({
  searchParams: { userId },
}: {
  searchParams: { userId: string };
}) => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return <div>Unauthenticated</div>;
  }
  const chat: IChat | null = await getUserChat(session.user.id, userId);
  if (!chat) {
    return <div>User not found</div>;
  }

  const messages: Message[] = await getChatMessages(chat.id);

  return (
    <Chat messages={messages} selectedUser={chat.toUser} isMobile={false} />
  );
};

export default ChatPage;
