import { getAppliedJobs } from "@/actions/job-application/getAppliedJobs";
import AppliedJobs from "@/components/AppliedJobs";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";

export default async function DevJobApplications({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return <div>Unauthorized</div>;
  }

  const status = searchParams["status"];
  const offset = searchParams["offset"];

  const jobs = await getAppliedJobs(status, parseInt(offset || "0"));

  return <AppliedJobs jobs={jobs} />;
}
