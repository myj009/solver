"use client";

import { useState, useEffect, useCallback } from "react";
import { getJobs } from "@/actions/job/listJobs";
import JobCard from "./JobCard";
import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Job, WorkMode, Country } from "@prisma/client";
import { JobWithClient } from "@/types/prisma-types";
import JobFilters from "./JobFilters";

type JobFilters = {
  country?: Country;
  workMode?: WorkMode;
  minAmount?: number;
  maxAmount?: number;
};

export default function JobList() {
  const [jobs, setJobs] = useState<JobWithClient[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState<JobFilters>({});

  const fetchJobs = useCallback(async () => {
    const { jobs, totalPages } = await getJobs(currentPage, filters);
    setJobs(jobs);
    setTotalPages(totalPages);
  }, [currentPage, filters]);

  useEffect(() => {
    fetchJobs();
  }, [currentPage, fetchJobs, filters]);

  const handleFilterChange = (newFilters: JobFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  return (
    <div className="flex flex-col gap-4">
      <JobFilters onFilterChange={handleFilterChange} />
      <div className="flex flex-col gap-4 w-full">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
      <Pagination
        className="mt-8"
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <ShadcnPagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) onPageChange(currentPage - 1);
            }}
          />
        </PaginationItem>
        {pageNumbers.map((number) => (
          <PaginationItem key={number}>
            <PaginationLink
              href="#"
              isActive={currentPage === number}
              onClick={(e) => {
                e.preventDefault();
                onPageChange(number);
              }}
            >
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) onPageChange(currentPage + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </ShadcnPagination>
  );
}
