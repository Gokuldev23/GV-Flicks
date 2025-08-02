export default function MovieGridSkeleton() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-4 sm:px-6">
            {[...Array(10)].map((_, i) => (
                <div key={i} className="group animate-pulse">
                    {/* Poster Skeleton with Shimmer */}
                    <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-gray-800">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700/30 to-transparent animate-[shimmer_1.5s_infinite]" />
                    </div>

                    {/* Text Skeletons */}
                    <div className="mt-3 space-y-2">
                        <div className="h-4 rounded-md bg-gray-700 w-3/4"></div>
                        <div className="h-3 rounded-md bg-gray-700 w-1/2"></div>
                    </div>
                </div>
            ))}
        </div>
    );
}

// Add this to your global CSS:
