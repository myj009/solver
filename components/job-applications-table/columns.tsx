"use client";

import { ColumnDef } from "@tanstack/react-table";

import { JobApplicationWithDeveloper } from "@/types/prisma-types";
import {
  acceptApplication,
  rejectApplication,
} from "@/actions/job-application/updateApplication";
import { useState } from "react";
import { toast } from "react-hot-toast";
import JobApplicationsTableActions from "./actions";

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
    filterFn: (row, id, value) => {
      if (value === "Accepted") return row.original.isAccepted;
      if (value === "Rejected") return row.original.isRejected;
      return true;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <JobApplicationsTableActions application={row.original} />;
    },
  },
];
