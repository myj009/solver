import prisma from "@/lib/db";
import { UserWithExperienceAndEducation } from "@/types/prisma-types";

export async function getUser(id: string) {
  const user: UserWithExperienceAndEducation | null =
    await prisma.user.findUnique({
      where: { id },
      include: {
        UserExperience: {
          orderBy: {
            startDate: "desc",
          },
        },
        UserEducation: {
          orderBy: {
            startDate: "desc",
          },
        },
      },
    });

  return user;
}
