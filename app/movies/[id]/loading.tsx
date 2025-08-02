export default function Loading() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="container mx-auto px-4 py-16 relative">
                    <div className="flex flex-col md:flex-row gap-8 animate-pulse">
                        {/* Poster */}
                        <div className="flex-shrink-0 w-full md:w-1/3 lg:w-1/4">
                            <div className="aspect-[2/3] w-full rounded-xl bg-gray-700 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-gray-700 via-gray-800/50 to-gray-700 animate-[shimmer_2s_infinite] bg-[length:200%_100%]" />
                            </div>
                        </div>

                        {/* Info */}
                        <div className="space-y-6 w-full">
                            <div className="space-y-3">
                                <div className="h-10 w-3/4 bg-gray-700 rounded" />
                                <div className="h-6 w-20 bg-gray-700 rounded" />
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="h-6 w-20 bg-gray-700 rounded-full" />
                                ))}
                            </div>

                            <div className="flex gap-4">
                                <div className="h-6 w-24 bg-gray-700 rounded" />
                                <div className="h-6 w-16 bg-gray-700 rounded" />
                            </div>

                            <div className="space-y-2 max-w-3xl">
                                <div className="h-4 w-full bg-gray-700 rounded" />
                                <div className="h-4 w-5/6 bg-gray-700 rounded" />
                                <div className="h-4 w-4/6 bg-gray-700 rounded" />
                                <div className="h-4 w-3/6 bg-gray-700 rounded" />
                            </div>

                            <div className="space-y-2">
                                <div className="h-4 w-16 bg-gray-700 rounded" />
                                <div className="h-5 w-32 bg-gray-700 rounded" />
                            </div>

                            <div className="space-y-2">
                                <div className="h-4 w-12 bg-gray-700 rounded" />
                                <div className="flex flex-wrap gap-2">
                                    {[...Array(5)].map((_, i) => (
                                        <div key={i} className="h-4 w-20 bg-gray-700 rounded" />
                                    ))}
                                </div>
                            </div>

                            <div className="h-12 w-40 bg-gray-700 rounded-lg" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Gallery */}
            <div className="container mx-auto px-4 py-12">
                <div className="h-8 w-32 bg-gray-700 rounded mb-6" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="aspect-video w-full bg-gray-700 rounded-lg relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-gray-700 via-gray-800/50 to-gray-700 animate-[shimmer_2s_infinite] bg-[length:200%_100%]" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Details */}
            <div className="container mx-auto px-4 py-12 grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div className="h-8 w-24 bg-gray-700 rounded mb-4" />
                    <div className="space-y-2">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-5 w-full bg-gray-700 rounded" />
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="h-8 w-24 bg-gray-700 rounded mb-4" />
                    <div className="space-y-2">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="h-5 w-full bg-gray-700 rounded" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}