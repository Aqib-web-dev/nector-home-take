const SkeletonLoader = () => {
  return (
    <div className="animate-pulse flex flex-col space-y-4">
      <div className="h-72 bg-gray-300 rounded"></div>
      <div className="h-8 bg-gray-300 rounded"></div>
      <div className="h-8 bg-gray-300 rounded"></div>
      <div className="h-8 bg-gray-300 rounded"></div>
      <div className="h-8 bg-gray-300 rounded"></div>
    </div>
  );
};

export default SkeletonLoader;
