import { getChatMessages } from "@/actions/chat/getChatMessages";
import { getUserChatWithMessages } from "@/actions/chat/getUserChats";
import { Chat } from "@/components/chat/chat";
import { authOptions } from "@/lib/auth";
import { Message } from "@prisma/client";
import { getServerSession } from "next-auth";
import { IChat, IChatWithMessages } from "./types";

const ChatPage = async ({
  searchParams: { userId },
}: {
  searchParams: { userId: string };
}) => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return <div>Unauthenticated</div>;
  }
  const chat: IChatWithMessages | null = await getUserChatWithMessages(
    session.user.id,
    userId
  );
  if (!chat) {
    return <div>User not found</div>;
  }

  return (
    <Chat
      initialMessages={chat.Messages}
      selectedUser={chat.toUser}
      isMobile={false}
      channelId={chat.id}
    />
  );
};

export default ChatPage;
