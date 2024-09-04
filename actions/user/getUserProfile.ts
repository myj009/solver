"use server";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { ProfileFormValues } from "@/lib/validators/user.validators";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function updateUserProfile(data: ProfileFormValues) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        country: data.country,
        address: data.address,
      },
    });

    revalidatePath("/profile");
    return { success: true, user: updatedUser };
  } catch (error) {
    console.error("Error updating user:", error);
    return { success: false, error: "Failed to update user" };
  }
}
