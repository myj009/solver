"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CreateJobForm } from "@/components/CreateJobForm";
import JobPostingTableActions from "./actions";

export type Job = {
  id: string;
  title: string;
  shortDescription: string;
  workMode: "REMOTE" | "HYBRID" | "OFFICE";
  country: string;
  amount: number | null;
  isAccepted: boolean;
  developerId: string | null;
  createdAt: Date;
};

export const columns: ColumnDef<Job>[] = [
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
    accessorKey: "developerId",
    header: "Developer",
    cell: ({ row }) => row.getValue("developerId") || "N/A",
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
