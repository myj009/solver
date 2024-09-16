"use client";

import React from "react";
import { JobWithClientAndApplications } from "@/types/prisma-types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from "react-markdown";
import { Button } from "./ui/button";
import applyJob from "@/actions/job/applyJob";
import toast from "react-hot-toast";

export default function JobPosting({
  job,
}: {
  job: JobWithClientAndApplications;
}) {
  const apply = async () => {
    const res = await applyJob(job);
    if (res.status === 200) {
      toast.success(res.message);
    } else if (res.status === 400) {
      toast(res.message);
    } else {
      toast.error("Failed to apply to job");
    }
  };

  return (
    <Card className="container max-w-3xl px-4 mt-8">
      <CardHeader>
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="">
            <CardTitle className="text-2xl font-bold">{job.title}</CardTitle>
            <div className="flex items-center space-x-2 mt-2">
              <Badge variant="secondary">{job.workMode}</Badge>
              <Badge variant="outline">{job.country}</Badge>
              {job.amount && <Badge variant="default">${job.amount}</Badge>}
            </div>
          </div>
          <Button onClick={apply}>Apply</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold">{job.shortDescription}</h3>
          </div>
          <div>
            <ReactMarkdown className="whitespace-pre-wrap">
              {job.longDescription}
            </ReactMarkdown>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Client</h3>
            <p>{job.client.name}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Applications</h3>
            <p>{job._count.JobApplication} application(s) received</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
