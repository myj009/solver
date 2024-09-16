"use client";

import { Button } from "@/components/ui/button";
import { JobWithDeveloperEmail } from "@/types/prisma-types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import JobPostingTableActions from "./actions";

export const columns: ColumnDef<JobWithDeveloperEmail>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "shortDescription",
    header: "Description",
  },
  {
    accessorKey: "workMode",
    header: "Work Mode",
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      return amount ? `$${amount.toFixed(2)}` : "N/A";
    },
  },
  {
    accessorKey: "isAccepted",
    header: "Status",
    cell: ({ row }) => (row.getValue("isAccepted") ? "Accepted" : "Open"),
  },
  {
    accessorKey: "developer.email",
    header: "Developer",
    cell: ({ row }) => row.original.developer?.email || "N/A",
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => new Date(row.getValue("createdAt")).toLocaleDateString(),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <JobPostingTableActions row={row} />;
    },
  },
];
