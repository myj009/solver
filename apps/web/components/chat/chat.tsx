"use client";

import { messageAtom } from "@/app/store";
import { connectSocket } from "@/lib/socket";
import { UserMin } from "@/types/prisma-types";
import { Message } from "@prisma/client";
import { useAtom, useSetAtom } from "jotai";
import { useSession } from "next-auth/react";
import { ChatList } from "./chat-list";
import ChatTopbar from "./chat-topbar";

interface ChatProps {
  selectedUser: UserMin;
  isMobile: boolean;
  channelId: string;
}

export function Chat({ selectedUser, isMobile, channelId }: ChatProps) {
  const { data } = useSession();
  const setMessages = useSetAtom(messageAtom);

  if (!data || !data.user) {
    return <div>Unauthenticated</div>;
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
        selectedUser={selectedUser}
        sendMessage={sendMessage}
        isMobile={isMobile}
      />
    </div>
  );
}
