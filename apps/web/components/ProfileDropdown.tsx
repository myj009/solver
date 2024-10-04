"use client";

import React, { useState } from "react";
import BoringAvatar from "boring-avatars";
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
import { Session } from "next-auth";
import { useSession } from "next-auth/react";

export default function ProfileDropdown() {
  const { data } = useSession();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (!data || !data.user) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {data.user.image && data.user.image != "" ? (
          <Avatar className="cursor-pointer">
            <AvatarImage src={data.user.image ?? undefined} alt="@MJ" />
            <AvatarFallback>MJ</AvatarFallback>
          </Avatar>
        ) : (
          <BoringAvatar size={35} name={data.user.id} variant="beam" />
        )}
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
            <Link href="/dev/jobs">View Jobs Applied To</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
