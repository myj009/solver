"use client";

import { Chat } from "@/components/chat/chat";
import { useAtom, useSetAtom } from "jotai";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { chatAtom, chatStore, messageAtom } from "../store";

const ChatPage = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const { data } = useSession();
  const [chat] = useAtom(chatAtom(userId));
  const setMessages = useSetAtom(messageAtom);

  useEffect(() => {
    const syncMessages = async () => {
      if (chat.state === "hasData" && chat.data) {
        setMessages(chat.data.messages);
      }
    };
    syncMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chat.state, setMessages]);

  if (!data || !data.user) {
    return <div>Unauthenticated</div>;
  }

  if (!userId) {
    return <div>No user selected</div>;
  }

  if (chat.state === "hasError") {
    console.log(chat.error);
    return <div>User not found</div>;
  }

  if (chat.state === "loading" || !chat.data) {
    return <div>Loading...</div>;
  }

  return (
    <Chat
      selectedUser={chat.data.toUser}
      isMobile={false}
      channelId={chat.data.id}
    />
  );
};

export default ChatPage;
