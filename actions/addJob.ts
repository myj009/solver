"use server";

import { FormSchema } from "@/components/AddJobForm";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { z } from "zod";

export async function addJob({
  title,
  description,
  country,
  workMode,
  amount,
}: z.infer<typeof FormSchema>) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return;
  }
  await prisma.job.create({
    data: {
      title,
      description,
      amount,
      workMode,
      location: country,
      clientId: session.user.id,
    },
  });
}
