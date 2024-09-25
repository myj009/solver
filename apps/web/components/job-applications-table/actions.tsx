"use client";

import {
  acceptApplication,
  rejectApplication,
} from "@/actions/job-application/updateApplication";
import { JobApplicationWithDeveloper } from "@/types/prisma-types";
import React, { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import toast from "react-hot-toast";

export default function JobApplicationsTableActions({
  application,
}: {
  application: JobApplicationWithDeveloper;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAccept = async () => {
    setIsLoading(true);
    const result = await acceptApplication(application.id);
    setIsLoading(false);
    if (result.success) {
      toast.success("Application accepted successfully");
    } else {
      toast.error(result.error || "Failed to accept application");
    }
  };

  const handleReject = async () => {
    setIsLoading(true);
    const result = await rejectApplication(application.id);
    setIsLoading(false);
    if (result.success) {
      toast.success("Application rejected successfully");
    } else {
      toast.error(result.error || "Failed to reject application");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={handleAccept}
          disabled={isLoading || application.isAccepted}
        >
          Accept Application
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleReject}
          disabled={isLoading || application.isRejected}
        >
          Reject Application
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/developer/${application.developer.id}`}>
            View Developer Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/chat?userId=${application.developerId}`}>
            Chat with Developer
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
