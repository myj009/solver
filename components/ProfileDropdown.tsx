import React from "react";
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

export default function ProfileDropdown({ image }: { image: string }) {
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
          <DropdownMenuLabel className="font-bold text-lg ">
            For Clients
          </DropdownMenuLabel>
          <DropdownMenuItem
            className="cursor-pointer text-secondary-foreground"
            asChild
          >
            <DropdownMenuLabel asChild>
              <Link href="/client/add-job">Add a Job Posting</Link>
            </DropdownMenuLabel>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" asChild>
            <DropdownMenuLabel asChild>
              <Link href="/client/jobs">View My Job Postings</Link>
            </DropdownMenuLabel>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-bold text-lg ">
            For Developers
          </DropdownMenuLabel>
          <DropdownMenuItem className="cursor-pointer" asChild>
            <DropdownMenuLabel asChild>
              <Link href="/job-postings">View Jobs Applied To</Link>
            </DropdownMenuLabel>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
