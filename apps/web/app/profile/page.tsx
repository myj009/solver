import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@repo/db/client";
import { redirect } from "next/navigation";
import ProfileForm from "@/components/ProfileForm";
import { UserWithExperienceAndEducation } from "@/types/prisma-types";
import { getUser } from "@/actions/user/getUser";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/auth/signin");
  }

  console.log(session.user);

  const user: UserWithExperienceAndEducation | null = await getUser(
    session.user.id
  );

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <ProfileForm user={user} />
    </div>
  );
}
