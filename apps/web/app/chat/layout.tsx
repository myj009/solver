import { getUserChats } from "@/actions/chat/getUserChats";
import { ChatLayout } from "@/components/chat/chat-layout";
import { cookies } from "next/headers";

export interface IChat {
  id: string;
  user: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
  };
}

export default async function ChatPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const layout = cookies().get("react-resizable-panels:layout");
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;

  const chats = await getUserChats();

  return (
    <div className="container max-h-[90vh] my-4 px-0 mx-auto border rounded-lg border-border">
      <ChatLayout
        defaultLayout={defaultLayout}
        navCollapsedSize={8}
        chats={chats}
      >
        {children}
      </ChatLayout>
    </div>
  );
}
