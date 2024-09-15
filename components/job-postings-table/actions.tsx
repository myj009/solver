import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { CreateJobForm } from "../CreateJobForm";
import { Row } from "@tanstack/react-table";
import { getJob } from "@/actions/job/getJob";
import { Job as JobType } from "@prisma/client";
import { Job } from "./columns";

export default function JobPostingTableActions({ row }: { row: Row<Job> }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [job, setJob] = useState<JobType | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      const job = await getJob(row.original.id);
      setJob(job);
    };

    fetchJob();
  }, [row.original.id]);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem>
            <Link href={`/client/${row.original.id}/applications`}>
              View Applications
            </Link>
          </DropdownMenuItem>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <DropdownMenuItem
                onSelect={(event) => {
                  event.preventDefault();
                  setIsDialogOpen(true);
                }}
              >
                Edit job posting
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <CreateJobForm
                job={job ?? undefined}
                onSuccess={() => setIsDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
