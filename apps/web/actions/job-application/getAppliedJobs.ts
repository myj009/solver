import { authOptions } from "@/lib/auth";
import { JobApplicationWithJob } from "@/types/prisma-types";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";

export async function getAppliedJobs(status?: string, offset?: number) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return [];
  }

  const jobs: JobApplicationWithJob[] = await prisma.jobApplication.findMany({
    where: {
      developerId: session.user.id,
      isAccepted: status === "accepted" ? true : undefined,
      isRejected: status === "rejected" ? true : undefined,
    },
    include: {
      job: {
        select: {
          title: true,
          shortDescription: true,
        },
      },
    },
    take: 10,
    skip: offset || 0,
    orderBy: {
      createdAt: "desc",
    },
  });

  return jobs;
}
