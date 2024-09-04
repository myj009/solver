import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
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
        <Link href="/profile">
          <DropdownMenuLabel className="cursor-pointer">
            My Account
          </DropdownMenuLabel>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
