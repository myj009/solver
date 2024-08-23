"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Job } from "@prisma/client";
import applyJob from "@/actions/job/applyJob";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

export default function JobCard({
  job,
  applyDisabled = false,
  className,
}: {
  job: Job;
  applyDisabled?: boolean;
  className?: string;
}) {
  const onJobApply = async (job: Job) => {
    const res = await applyJob(job);
    if (res.status !== 200) {
      toast.error(res.message);
      return;
    }
    toast.success(res.message);
  };

  return (
    <Card key={job.id} className={cn(className, "hover:shadow-lg")}>
      <CardHeader className="flex flex-row justify-between">
        <div className="flex flex-col space-y-2">
          <CardTitle>{job.title}</CardTitle>
          <CardDescription>{job.description}</CardDescription>
        </div>
        {!applyDisabled && (
          <Button onClick={() => onJobApply(job)} className="bg-green-600">
            Apply
          </Button>
        )}
      </CardHeader>
      <CardContent className="flex space-x-4">
        <div className="">{job.amount}</div>
        <div className="">{job.workMode}</div>
        <div className="">{job.location}</div>
      </CardContent>
    </Card>
  );
}
