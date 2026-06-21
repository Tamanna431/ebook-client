'use client';

export default function SkeletonCard({ count = 6 }) {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <div key={i} className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 animate-pulse">
          {/* Cover Image Skeleton */}
          <div className="h-64 bg-gray-700" />
          
          {/* Content Skeleton */}
          <div className="p-4 space-y-3">
            <div className="h-5 bg-gray-700 rounded w-3/4" />
            <div className="h-4 bg-gray-700 rounded w-1/2" />
            <div className="h-3 bg-gray-700 rounded w-full" />
            
            <div className="flex justify-between pt-2">
              <div className="h-4 bg-gray-700 rounded w-1/4" />
              <div className="h-4 bg-gray-700 rounded w-1/4" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}