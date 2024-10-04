"use client";

import { JobApplicationWithJob } from "@/types/prisma-types";
import React from "react";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

type AppliedJobsProps = {
  jobs: JobApplicationWithJob[];
};

export default function AppliedJobs({ jobs }: AppliedJobsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  
  return (
    <div className="container mx-auto flex flex-col gap-8 py-10">
      <h1 className="text-3xl font-bold">Applied Jobs</h1>
      <div className="flex gap-4">
        <div className="flex flex-col gap-4 py-4 px-8 rounded-xl border h-fit">
          <div className="text-xl font-semibold">Status</div>
          <RadioGroup
            defaultValue="all"
            onValueChange={(value) => {
              const params = new URLSearchParams();
              let path = pathname.split("?")[0];
              if (value === "all") {
                params.delete("status");
              } else {
                params.set("status", value);
                path += "?" + params.toString();
              }
              router.push(path);
            }}
          >
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="all" id="all" />
              <Label className="text-base" htmlFor="all">
                All
              </Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="accepted" id="accepted" />
              <Label className="text-base" htmlFor="accepted">
                Accepted
              </Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="rejected" id="rejected" />
              <Label className="text-base" htmlFor="rejected">
                Rejected
              </Label>
            </div>
          </RadioGroup>
        </div>
        <div className="flex flex-col gap-4 w-full">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="flex flex-col gap-4 p-4 rounded-xl border w-full"
            >
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="flex gap-4 items-center">
                  <div className="text-xl font-semibold">{job.job.title}</div>
                  {job.isAccepted ? (
                    <div className="text-green-600 px-2 rounded-full">
                      Accepted
                    </div>
                  ) : job.isRejected ? (
                    <div className="text-red-500 px-2 rounded-full">
                      Rejected
                    </div>
                  ) : (
                    <div className="text-yellow-500 px-2 rounded-2xl">
                      Pending
                    </div>
                  )}
                </div>
                <div className="flex gap-2 items-center">
                  <span className="font-semibold">Applied On: </span>
                  {job.createdAt.toDateString()}
                </div>
              </div>
              <Button
                variant="outline"
                className="w-fit"
                onClick={() => {
                  router.push("/jobs/" + job.jobId);
                }}
              >
                View Job
              </Button>
              <div>{job.job.shortDescription}</div>
              {/* <div className="flex flex-col gap-2">
                <div className="text-xl font-semibold">Status</div>
                <div>{job.status}</div>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
