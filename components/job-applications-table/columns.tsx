"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { JobApplicationWithDeveloper } from "@/types/prisma-types";

export const columns: ColumnDef<JobApplicationWithDeveloper>[] = [
  {
    accessorKey: "developer.name",
    header: "Developer Name",
  },
  {
    accessorKey: "developer.email",
    header: "Developer Email",
  },
  {
    accessorKey: "developer.country",
    header: "Developer Country",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const application = row.original;
      if (application.isAccepted) return "Accepted";
      if (application.isRejected) return "Rejected";
      return "Pending";
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const application = row.original;

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
              onClick={() => {
                // Handle accept action
                console.log("Accept application", application.id);
              }}
            >
              Accept Application
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                // Handle reject action
                console.log("Reject application", application.id);
              }}
            >
              Reject Application
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/developer/${application.developer.id}`}>
                View Developer Profile
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
