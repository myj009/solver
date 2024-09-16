import React from "react";
import { columns } from "@/components/job-postings-table/columns";
import { DataTable } from "@/components/job-postings-table/data-table";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { JobWithDeveloperEmail } from "@/types/prisma-types";

async function getJobs() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return [];
  }

  const jobs: JobWithDeveloperEmail[] = await prisma.job.findMany({
    where: {
      clientId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      developer: {
        select: {
          email: true,
        },
      },
    },
  });

  return jobs;
}

export default async function JobPostingsPage() {
  const jobs = await getJobs();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Your Job Postings</h1>
      <DataTable columns={columns} data={jobs} />
    </div>
  );
}
