import Link from "next/link";
import { Job, WorkMode, Country } from "@prisma/client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JobWithClient } from "@/types/prisma-types";

interface JobCardProps {
  job: JobWithClient;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <Card className="bg-secondary">
      <CardHeader>
        <div className="flex flex-row gap-2 justify-between items-center">
          <div className="flex flex-col gap-2">
            <CardTitle>{job.title}</CardTitle>
            <CardDescription>{job.shortDescription}</CardDescription>
          </div>
          <Button>
            <Link href={`/jobs/${job.id}/apply`}>Apply Now</Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <div>
          <p>
            <strong>Work Mode:</strong>
          </p>
          <p>{job.workMode}</p>
        </div>
        <div>
          <p>
            <strong>Country:</strong>
          </p>
          <p>{job.country}</p>
        </div>
        <div>
          <p>
            <strong>Amount:</strong>
          </p>
          <p>${job.amount}</p>
        </div>
        <div>
          <p>
            <strong>Client:</strong>
          </p>
          <p>{job.client.name}</p>
        </div>
      </CardContent>
    </Card>
  );
}
