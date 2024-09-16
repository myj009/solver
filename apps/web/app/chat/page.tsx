import { ChatLayout } from "@/components/chat/chat-layout";
import { cookies } from "next/headers";

export default function ChatPage() {
  const layout = cookies().get("react-resizable-panels:layout");
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;

  return (
    <div className="container max-h-[90vh] my-4 px-0 mx-auto border rounded-lg border-border">
      <ChatLayout
        defaultLayout={defaultLayout}
        navCollapsedSize={8}
      ></ChatLayout>
    </div>
  );
}
