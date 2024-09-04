"use server";

import { v2 as cloudinary } from "cloudinary";
import prisma from "@/lib/db";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadProfileImage(userId: string, imageData: string) {
  try {
    console.log(imageData, userId);
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
