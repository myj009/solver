"use client";

import { connectSocket } from "@/lib/socket";
import { ChatList } from "./chat-list";
import ChatTopbar from "./chat-topbar";
import { UserMin } from "@/types/prisma-types";
import { Message } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useState } from "react";

interface ChatProps {
  initialMessages: Message[];
  selectedUser: UserMin;
  isMobile: boolean;
  channelId: string;
}

export function Chat({
  initialMessages,
  selectedUser,
  isMobile,
  channelId,
}: ChatProps) {
  // const messagesState = useChatStore((state) => state.messages);
  const { data } = useSession();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  if (!data || !data.user) {
    return null;
  }

  const sendMessage = async (newMessage: string) => {
    const socket = connectSocket(data.user.token);
    const res = await socket.emitWithAck("message:send", {
      channelId: channelId,
      content: newMessage,
    });
    console.log(res);
    const message = res.message as Message;
    console.log(message);
    if (typeof message.createdAt === "string") {
      message.createdAt = new Date(message.createdAt);
    }
    setMessages((prev) => [...prev, message]);
  };

  return (
    <div className="flex flex-col justify-between w-full h-full">
      <ChatTopbar selectedUser={selectedUser} />

      <ChatList
        messages={messages}
        selectedUser={selectedUser}
        sendMessage={sendMessage}
        isMobile={isMobile}
      />
    </div>
  );
}
