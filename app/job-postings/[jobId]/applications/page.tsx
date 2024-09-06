import React from "react";
import { columns } from "@/components/job-applications-table/columns";
import { DataTable } from "@/components/job-applications-table/data-table";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { JobApplicationWithDeveloper } from "@/types/prisma-types";

async function getJobApplications(jobId: string) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return [];
  }

  const jobApplications: JobApplicationWithDeveloper[] =
    await prisma.jobApplication.findMany({
      where: {
        jobId: jobId,
        job: {
          clientId: session.user.id,
        },
      },
      include: {
        developer: {
          select: {
            id: true,
            name: true,
            email: true,
            country: true,
          },
        },
      },
    });

  return jobApplications;
}

export default async function JobApplicationsPage({
  params,
}: {
  params: { jobId: string };
}) {
  const jobApplications = await getJobApplications(params.jobId);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Job Applications</h1>
      <DataTable columns={columns} data={jobApplications} />
    </div>
  );
}
