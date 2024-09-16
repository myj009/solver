"use server";

import prisma from "@repo/db/client";
import { revalidatePath } from "next/cache";

export async function acceptApplication(applicationId: string) {
  try {
    const jobApplication = await prisma.jobApplication.update({
      where: { id: applicationId },
      data: {
        isAccepted: true,
        isRejected: false,
      },
      select: {
        jobId: true,
        developerId: true,
      },
    });

    await prisma.job.update({
      where: {
        id: jobApplication.jobId,
      },
      data: {
        isAccepted: true,
        developerId: jobApplication.developerId,
      },
    });
    revalidatePath("/client/[jobId]/applications");
    return { success: true };
  } catch (error) {
    console.error("Error accepting application:", error);
    return { success: false, error: "Failed to accept application" };
  }
}

export async function rejectApplication(applicationId: string) {
  try {
    await prisma.jobApplication.update({
      where: { id: applicationId },
      data: {
        isRejected: true,
        isAccepted: false,
      },
    });
    revalidatePath("/client/[jobId]/applications");
    return { success: true };
  } catch (error) {
    console.error("Error rejecting application:", error);
    return { success: false, error: "Failed to reject application" };
  }
}
