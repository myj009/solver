import prisma from "@repo/db/src";

export const fetchUserChannels = async (userId: string) => {
  return await prisma.userChannel.findMany({
    where: {
      userId,
    },
    select: {
      channelId: true,
    },
  });
};
