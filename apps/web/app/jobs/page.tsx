import JobList from "@/components/JobList";
import { Suspense } from "react";
import Loading from "./loading";

export default function JobsPage() {
  return (
    <div className="container mx-auto flex flex-col gap-8 px-4 py-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Explore Jobs</h1>
        <div className="text-muted-foreground">
          Explore thousands of remote and onsite jobs that match your skills and
          aspirations.
        </div>
      </div>

      <div className="w-full">
        <Suspense fallback={<Loading />}>
          <JobList />
        </Suspense>
      </div>
    </div>
  );
}
