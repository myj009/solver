import ApplicationCard from "@/components/ApplicationCard";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function page({ params }: { params: { jobId: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) redirect("/api/auth/signin");

  const job = await prisma.job.findUnique({
    where: {
      id: params.jobId,
    },
  });

  if (!job || job.clientId !== session.user.id)
    return (
      <div className="flex h-full w-full items-center justify-center">
        The job does not exist
      </div>
    );

  const applications = await prisma.jobApplication.findMany({
    where: {
      jobId: params.jobId,
    },
  });

  return (
    <section className="container flex flex-col space-y-4 pt-8">
      {applications.map((app) => (
        <ApplicationCard key={job.id} application={app} />
      ))}
    </section>
  );
}
