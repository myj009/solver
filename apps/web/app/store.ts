import { getUserChatWithMessages } from "@/actions/chat/getUserChats";
import { Message } from "@prisma/client";
import deepEqual from "fast-deep-equal";
import { atom, createStore, getDefaultStore } from "jotai";
import { atomFamily, loadable } from "jotai/utils";
import { IChatWithMessages } from "./chat/types";

export const chatStore = createStore();
export const messageAtom = atom<Message[]>([]);

export const updateMessageAtom = (message: Message) => {
  console.log(message);
  chatStore.set(messageAtom, (prev) => {
    console.log("Previous messages:", prev); // Debugging line
    if (typeof message.createdAt == "string") {
      message.createdAt = new Date(message.createdAt);
    }
    const updatedMessages = [...prev, message];
    console.log("Updated messages:", updatedMessages); // Debugging line
    return updatedMessages;
  });
};

const chatAsyncAtom = atomFamily(
  (userId: string | null) =>
    atom(async () => {
      if (!userId) {
        return null;
      }

      const chat: IChatWithMessages | null = await getUserChatWithMessages(
        userId
      );
      console.log(chat);
      return chat;
    }),
  deepEqual
);

export const chatAtom = atomFamily((userId: string | null) =>
  loadable(chatAsyncAtom(userId))
);
