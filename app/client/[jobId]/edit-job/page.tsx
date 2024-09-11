import React from "react";
import { CreateJobForm } from "@/components/CreateJobForm";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";

export default async function page({ params }: { params: { jobId: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

  const job = await prisma.job.findUnique({
    where: {
      id: params.jobId,
    },
  });

  if (!job) {
    return <div>Job not found</div>;
  }

  return (
    <div className="container border my-10 py-6 rounded-lg">
      <CreateJobForm job={job} />
    </div>
  );
}
