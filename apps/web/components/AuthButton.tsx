"use client";
import React from "react";
import { Button } from "./ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const session = useSession();
  return (
    <Button
      variant="default"
      onClick={() => {
        session && session.data?.user ? signOut() : signIn();
      }}
    >
      {session && session.data?.user ? "Logout" : "Login"}
    </Button>
  );
}
