"use client";

import { Chat } from "@/components/chat/chat";
import { userData } from "@/lib/chat-data";

export default function ChatPage() {
  return (
    <Chat
      messages={userData[0].messages}
      selectedUser={userData[0]}
      isMobile={false}
    />
  );
}
