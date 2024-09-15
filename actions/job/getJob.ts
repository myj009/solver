"use server";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function getJob(jobId: string) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

  const job = await prisma.job.findUnique({
    where: {
      id: jobId,
    },
  });

  return job;
}
