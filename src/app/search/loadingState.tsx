const SkeletonLoader = () => {
  return (
    <div className="flex p-4 bg-gray-200 rounded-lg shadow-md mb-4 animate-pulse">
      <div className="w-24 h-36 bg-gray-300 rounded mr-4"></div>
      <div className="flex flex-col justify-between flex-1">
        <div className="space-y-2">
          <div className="w-3/4 h-6 bg-gray-300 rounded"></div>
          <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
        </div>
        <div className="w-full h-4 bg-gray-300 rounded mt-2"></div>
        <div className="w-full h-4 bg-gray-300 rounded mt-2"></div>
        <div className="w-3/4 h-4 bg-gray-300 rounded mt-2"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
