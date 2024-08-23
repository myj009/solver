import JobCard from "@/components/JobCard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { Job } from "@prisma/client";
import { getServerSession } from "next-auth";
import React from "react";

export default async function page() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) return;

  const jobs = await prisma.job.findMany({
    where: {
      isAccepted: false,
      clientId: {
        not: session.user.id,
      },
    },
  });

  return (
    <section className="container flex flex-col space-y-4 pt-8">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </section>
  );
}

function ApplyButton() {
  return <div>page</div>;
}
