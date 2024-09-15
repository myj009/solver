import { getUser } from "@/actions/user/getUser";
import ProfileForm from "@/components/ProfileForm";
import { authOptions } from "@/lib/auth";
import { UserWithExperienceAndEducation } from "@/types/prisma-types";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function page({ params }: { params: { devId: string } }) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/auth/signin");
  }

  const user: UserWithExperienceAndEducation | null = await getUser(
    params.devId
  );

  if (!user) {
    return <div>User not found</div>;
  }
  return (
    <div className="container mx-auto p-4">
      <ProfileForm user={user} viewOnly={true} />
    </div>
  );
}
