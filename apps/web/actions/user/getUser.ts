import prisma from "@repo/db/client";
import { UserMin, UserWithExperienceAndEducation } from "@/types/prisma-types";

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

export async function getUserMin(id: string) {
  const user: UserMin | null = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
    },
  });

  return user;
}
