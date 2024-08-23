import JobCard from "@/components/JobCard";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";
import prisma from "@/lib/db";
import Link from "next/link";

export default async function page() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) return;

  const jobs = await prisma.job.findMany({
    where: {
      isAccepted: false,
      clientId: session.user.id,
    },
  });

  return (
    <section className="container flex flex-col space-y-4 pt-8">
      {jobs.map((job) => (
        <Link key={job.id} href={`/client/jobs/${job.id}`}>
          <JobCard className="cursor-pointer" job={job} applyDisabled={true} />
        </Link>
      ))}
    </section>
  );
}
