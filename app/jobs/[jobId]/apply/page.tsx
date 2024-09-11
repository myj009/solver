import React from "react";
import { notFound } from "next/navigation";
import prisma from "@/lib/db";
import JobPosting from "@/components/JobPosting";

export default async function JobPostingPage({
  params: { jobId },
}: {
  params: { jobId: string };
}) {
  const job = await prisma.job.findUnique({
    where: { id: jobId },
    include: {
      client: {
        select: {
          id: true,
          name: true,
        },
      },
      _count: {
        select: {
          JobApplication: true,
        },
      },
    },
  });

  if (!job) {
    notFound();
  }

  // return <div>Apply</div>;

  return (
    <div className="px-2 sm:px-4">
      <JobPosting job={job} />
    </div>
  );
}
