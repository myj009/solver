import { Skeleton } from "../ui/skeleton";

export default function FiltersSkeleton() {
  return (
    <div className="mb-6 flex flex-wrap gap-4">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="h-10 w-32" />
      ))}
    </div>
  );
}
