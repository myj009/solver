import CardsSkeleton from "@/components/skeletons/CardsSkeleton";
import FiltersSkeleton from "@/components/skeletons/FiltersSkeleton";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-full">
        <FiltersSkeleton />
        <CardsSkeleton />
      </div>
    </div>
  );
}
