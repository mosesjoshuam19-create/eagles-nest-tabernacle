
import { Skeleton } from "@/components/ui/skeleton";

interface MediaLoadingSkeletonProps {
  count?: number;
}

const MediaLoadingSkeleton = ({ count = 10 }: MediaLoadingSkeletonProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="aspect-video">
          <Skeleton className="h-full w-full rounded-lg" />
        </div>
      ))}
    </div>
  );
};

export default MediaLoadingSkeleton;
