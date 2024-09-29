import { getChatMessages } from "@/actions/chat/getChatMessages";
import { getUserChat } from "@/actions/chat/getUserChats";
import { Chat } from "@/components/chat/chat";
import { authOptions } from "@/lib/auth";
import { Message } from "@prisma/client";
import { getServerSession } from "next-auth";
import { IChat } from "./layout";

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
  console.log(messages);

  return (
    <Chat
      initialMessages={messages}
      selectedUser={chat.toUser}
      isMobile={false}
      channelId={chat.id}
    />
  );
};

export default ChatPage;
