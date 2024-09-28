"use client";

import { ChatList } from "./chat-list";
import ChatTopbar from "./chat-topbar";
import { UserMin } from "@/types/prisma-types";
import { Message } from "@prisma/client";

interface ChatProps {
  messages: Message[];
  selectedUser: UserMin;
  isMobile: boolean;
}

export function Chat({ messages, selectedUser, isMobile }: ChatProps) {
  // const messagesState = useChatStore((state) => state.messages);

  // const sendMessage = (newMessage: Message) => {
  //   useChatStore.setState((state) => ({
  //     messages: [...state.messages, newMessage],
  //   }));
  // };

  return (
    <div className="flex flex-col justify-between w-full h-full">
      <ChatTopbar selectedUser={selectedUser} />

      <ChatList
        messages={messages}
        selectedUser={selectedUser}
        // sendMessage={sendMessage}
        isMobile={isMobile}
      />
    </div>
  );
}
