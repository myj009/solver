import { CreateJobForm } from "@/components/CreateJobForm";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function page() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }
  return (
    <div className="container border my-10 py-6 rounded-lg">
      <CreateJobForm />
    </div>
  );
}
