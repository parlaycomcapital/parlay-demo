export const PostCardSkeleton = () => {
  return (
    <div className="bg-gray-800/50 rounded-2xl overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-700"></div>
      <div className="p-6">
        <div className="flex items-center mb-3">
          <div className="w-8 h-8 bg-gray-700 rounded-full mr-3"></div>
          <div>
            <div className="h-4 bg-gray-700 rounded w-24 mb-1"></div>
            <div className="h-3 bg-gray-700 rounded w-16"></div>
          </div>
        </div>
        <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-700 rounded w-full mb-1"></div>
        <div className="h-4 bg-gray-700 rounded w-2/3 mb-4"></div>
        <div className="flex items-center justify-between">
          <div className="flex space-x-4">
            <div className="h-4 bg-gray-700 rounded w-12"></div>
            <div className="h-4 bg-gray-700 rounded w-12"></div>
            <div className="h-4 bg-gray-700 rounded w-12"></div>
          </div>
          <div className="h-8 bg-gray-700 rounded w-16"></div>
        </div>
      </div>
    </div>
  );
};

export const FeedSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <PostCardSkeleton key={i} />
      ))}
    </div>
  );
};
