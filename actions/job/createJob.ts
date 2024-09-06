"use server";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { Country } from "@prisma/client";
import { getServerSession } from "next-auth";
import { z } from "zod";

type CountryEnum = (typeof Country)[keyof typeof Country];

const FormSchema = z.object({
  title: z.string().min(2).max(100),
  shortDescription: z.string().min(10).max(200),
  longDescription: z.string().min(10),
  workMode: z.enum(["REMOTE", "HYBRID", "OFFICE"]),
  amount: z.number().int().positive().optional(),
  country: z.nativeEnum(Country),
});

export async function createJob(values: z.infer<typeof FormSchema>) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  await prisma.job.create({
    data: {
      title: values.title,
      shortDescription: values.shortDescription,
      longDescription: values.longDescription,
      workMode: values.workMode,
      amount: values.amount,
      country: values.country,
      clientId: session.user.id,
    },
  });
}
