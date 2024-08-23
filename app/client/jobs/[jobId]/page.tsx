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
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default async function page({ params }: { params: { jobId: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) redirect("/api/auth/signin");

  const jobId = params.jobId;

  const job = await prisma.job.findUnique({
    where: {
      id: jobId,
    },
  });

  if (!job || job.clientId !== session.user.id)
    return (
      <div className="flex h-full w-full items-center justify-center">
        The job does not exist
      </div>
    );

  console.log(job);

  return (
    <div className="container h-full w-full py-6">
      <Card className="h-full">
        <CardHeader className="flex flex-row justify-between">
          <div>
            <CardTitle>{job.title}</CardTitle>
            <CardDescription>{job.description}</CardDescription>
            <div className="">Amount - ${job.amount}</div>
            <div className="">Work Mode - {job.workMode}</div>
            <div className="">Location - {job.location}</div>
          </div>
          <Link href={`${jobId}/applications`}>
            <Button>View applications</Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
            consequatur voluptate distinctio, esse sint dolorem veniam
            recusandae aperiam ullam, illum nemo facilis neque id, optio eveniet
            nulla. Delectus soluta sed minima temporibus quibusdam quam.
            Laudantium voluptatibus dolorem modi error distinctio, natus sit nam
            voluptate explicabo, doloremque, rerum accusantium. Molestias,
            facilis porro perspiciatis earum numquam illo maiores hic sed
            dolores dolor! Quos fugit eos reiciendis accusamus optio ipsum.
            Beatae optio iure aperiam molestiae repudiandae atque temporibus.
            Explicabo nobis a quae deleniti rerum ducimus ad obcaecati enim
            quas? Eaque a, quasi adipisci aliquam explicabo nam aperiam impedit
            tenetur quidem maiores dolor suscipit.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
