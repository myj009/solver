"use server";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { Job } from "@prisma/client";
import { getServerSession } from "next-auth";

interface IReturnType {
  message: string;
  status: number;
}

export default async function applyJob(job: Job): Promise<IReturnType> {
  const session = await getServerSession(authOptions);
  if (!session || !session.user)
    return { message: "Not authorized to apply for a job", status: 403 };

  if (job.clientId === session.user.id) {
    return {
      message: "Cannot apply to a job created by yourself",
      status: 400,
    };
  }

  try {
    const existingApplication = await prisma.jobApplication.findFirst({
      where: {
        developerId: session.user.id,
        jobId: job.id,
      },
    });

    if (existingApplication) {
      return {
        message: "Already applied to this job",
        status: 400,
      };
    }

    await prisma.jobApplication.create({
      data: {
        developerId: session.user.id,
        jobId: job.id,
      },
    });
  } catch (error) {
    console.error(error);
    return {
      message: "Failed to apply to job",
      status: 500,
    };
  }

  return {
    message: "Applied to job successfully",
    status: 200,
  };
}
