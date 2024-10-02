import { getChatMessages } from "@/actions/chat/getChatMessages";
import { Message } from "@prisma/client";
import { atom, createStore, Getter, Setter } from "jotai";
import { atomFamily } from "jotai/utils";

const messagesAtom = atomFamily((channelId: string) => {
  return atom(async (get) => {
    const messages = await getChatMessages(channelId);
    return messages;
  });
});
