"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { CreateJobForm } from "./CreateJobForm";

export default function ProfileDropdown({ image }: { image: string }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="cursor-pointer">
          <AvatarImage src={image ?? undefined} alt="@MJ" />
          <AvatarFallback>MJ</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="cursor-pointer" asChild>
          <DropdownMenuLabel asChild>
            <Link href="/profile">My Account</Link>
          </DropdownMenuLabel>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-bold text-base ">
            For Clients
          </DropdownMenuLabel>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <DropdownMenuItem
                className="cursor-pointer text-secondary-foreground"
                onSelect={(event) => {
                  event.preventDefault();
                  setIsDialogOpen(true);
                }}
              >
                Add a Job Posting
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <CreateJobForm onSuccess={() => setIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>
          <DropdownMenuItem
            className="cursor-pointer text-secondary-foreground"
            asChild
          >
            <Link href="/client/jobs">View My Job Postings</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-bold text-base ">
            For Developers
          </DropdownMenuLabel>
          <DropdownMenuItem className="cursor-pointer" asChild>
            <Link href="/job-postings">View Jobs Applied To</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
