import { getChatMessages } from "@/actions/chat/getChatMessages";
import { getUserChat } from "@/actions/chat/getUserChats";
import { Message } from "@prisma/client";
import deepEqual from "fast-deep-equal";
import { atom, createStore } from "jotai";
import { atomFamily, loadable } from "jotai/utils";
import { IChat } from "./chat/types";

export const chatStore = createStore();
export const messageAtom = atomFamily((channelId: string) =>
  atom<Message[]>([])
);

export const syncMessagesAtom = atomFamily(
  (channelId: string) =>
    atom(null, async (get, set) => {
      const messages = await getChatMessages(channelId);
      // console.log(messages);
      set(messageAtom(channelId), messages);
      return messages;
    }),
  deepEqual
);

export const updateMessageAtom = (newMessage: Message) => {
  // console.log(newMessage);
  chatStore.set(messageAtom(newMessage.channelId), (prev) => {
    // console.log("Previous messages:", prev); // Debugging line
    if (typeof newMessage.createdAt == "string") {
      newMessage.createdAt = new Date(newMessage.createdAt);
    }
    const updatedMessages = [...prev, newMessage];
    // console.log("Updated messages:", updatedMessages); // Debugging line
    return updatedMessages;
  });
};

const chatAsyncAtom = atomFamily(
  (userId: string | null) =>
    atom(async () => {
      if (!userId) {
        return null;
      }

      const chat: IChat | null = await getUserChat(userId);
      // console.log(chat);
      return chat;
    }),
  deepEqual
);

export const chatAtom = atomFamily((userId: string | null) =>
  loadable(chatAsyncAtom(userId))
);
