"use server";

import prisma from "@repo/db/client";
import { JobWithClient } from "@/types/prisma-types";
import { WorkMode, Country } from "@prisma/client";

type JobFilters = {
  country?: Country;
  workMode?: WorkMode;
  minAmount?: number;
  maxAmount?: number;
};

export async function getJobs(page: number = 1, filters: JobFilters = {}) {
  const pageSize = 10;
  const skip = (page - 1) * pageSize;

  const where = {
    isAccepted: false,
    ...(filters.country && { country: filters.country }),
    ...(filters.workMode && { workMode: filters.workMode }),
    ...(filters.minAmount && { amount: { gte: filters.minAmount } }),
    ...(filters.maxAmount && { amount: { lte: filters.maxAmount } }),
  };

  const jobs: JobWithClient[] = await prisma.job.findMany({
    where,
    include: {
      client: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    skip,
    take: pageSize,
    orderBy: { createdAt: "desc" },
  });

  const totalCount = await prisma.job.count({ where });

  return { jobs, totalCount, totalPages: Math.ceil(totalCount / pageSize) };
}
