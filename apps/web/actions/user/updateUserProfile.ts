"use server";

import { authOptions } from "@/lib/auth";
import cloudinary from "@/lib/config/cloudinary";
import prisma from "@repo/db/client";
import {
  EducationFormValues,
  ExperienceFormValues,
  ProfileFormValues,
} from "@/lib/validators/user.validators";
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

export async function addEducation(userId: string, data: EducationFormValues) {
  try {
    const newEducation = await prisma.userEducation.create({
      data: {
        userId,
        institutionName: data.institutionName,
        fieldOfStudy: data.fieldOfStudy,
        startDate: data.fromDate.from,
        endDate: data.toDate.to ? data.toDate.to : null,
      },
    });
    return { success: true, data: newEducation };
  } catch (error) {
    console.error("Error adding education:", error);
    return { success: false, error: "Failed to add education" };
  }
}

export async function updateEducation(
  educationId: string,
  data: EducationFormValues
) {
  try {
    const updatedEducation = await prisma.userEducation.update({
      where: { id: educationId },
      data: {
        institutionName: data.institutionName,
        fieldOfStudy: data.fieldOfStudy,
        startDate: data.fromDate.from,
        endDate: data.toDate.to ? data.toDate.to : null,
      },
    });
    return { success: true, data: updatedEducation };
  } catch (error) {
    console.error("Error updating education:", error);
    return { success: false, error: "Failed to update education" };
  }
}

export async function addExperience(
  userId: string,
  data: ExperienceFormValues
) {
  try {
    const newExperience = await prisma.userExperience.create({
      data: {
        userId,
        companyName: data.companyName,
        position: data.position,
        description: data.description,
        startDate: data.fromDate.from,
        endDate: data.toDate.to ? data.toDate.to : null,
      },
    });
    return { success: true, data: newExperience };
  } catch (error) {
    console.error("Error adding experience:", error);
    return { success: false, error: "Failed to add experience" };
  }
}

export async function updateExperience(
  experienceId: string,
  data: ExperienceFormValues
) {
  try {
    const updatedExperience = await prisma.userExperience.update({
      where: { id: experienceId },
      data: {
        companyName: data.companyName,
        position: data.position,
        description: data.description,
        startDate: data.fromDate.from,
        endDate: data.toDate.to ? data.toDate.to : null,
      },
    });
    return { success: true, data: updatedExperience };
  } catch (error) {
    console.error("Error updating experience:", error);
    return { success: false, error: "Failed to update experience" };
  }
}

export async function uploadProfileImage(userId: string, imageData: string) {
  try {
    const result = await cloudinary.uploader.upload(imageData, {
      folder: "profile_images",
    });

    await prisma.user.update({
      where: { id: userId },
      data: { image: result.secure_url },
    });

    return { success: true, imageUrl: result.secure_url };
  } catch (error) {
    console.error("Error uploading image:", error);
    return { success: false, error: "Failed to upload image" };
  }
}
