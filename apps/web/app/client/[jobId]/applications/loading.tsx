import React from "react";
import TableSkeleton from "@/components/skeletons/TableSkeleton";
import FiltersSkeleton from "@/components/skeletons/FiltersSkeleton";

export default function Loading() {
  return (
    <div className="container mx-auto py-10 flex flex-col gap-4">
      <h1 className="text-2xl font-bold mb-5">Job Applications</h1>
      <FiltersSkeleton />
      <TableSkeleton />
    </div>
  );
}
