import prisma from "@repo/db/src";
import { Socket } from "socket.io";
import * as z from "zod";

const PayloadType = z.object({
  userId: z.string().cuid(),
});

export function reachUser(socket: Socket) {
  return async (payload: z.infer<typeof PayloadType>, callback: any) => {
    console.log("reachuser");
    console.log(payload, callback);
    if (typeof callback !== "function") {
      return;
    }

    try {
      const channel = await prisma.channel.create({
        data: {
          UserChannels: {
            create: [{ userId: socket.id }, { userId: payload.userId }],
          },
        },
        select: { id: true },
      });
    } catch (e) {
      console.error(e);
      return callback({
        status: "ERROR",
      });
    }
  };
}
