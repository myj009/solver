import JobList from "@/components/JobList";
import { Suspense } from "react";

export default function JobsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Available Jobs</h1>
      <div className="w-full">
        <Suspense fallback={<div>Loading jobs...</div>}>
          <JobList />
        </Suspense>
      </div>
    </div>
  );
}
