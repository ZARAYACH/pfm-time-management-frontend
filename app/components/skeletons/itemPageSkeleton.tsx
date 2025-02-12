const ItemDetailsSkeleton = () => {
  return (
    <div className="w-full animate-pulse space-y-4">
      <div className="w-full flex justify-around items-center">
        <div className="w-full space-y-8 ">
          <div className="h-8 bg-gray-300 rounded-md mt-8"></div>
          <div className="h-4 bg-gray-300 rounded-md mt-8"></div>
          <div className="h-4 bg-gray-300 rounded-md mt-8"></div>
          <div className="h-4 bg-gray-300 rounded-md mt-8"></div>
          <div className="h-10 bg-gray-300 rounded-md mt-8"></div>
          <div className="flex space-x-4 mt-8">
            <div className="w-20 h-12 bg-gray-300 rounded-md"></div>
            <div className="w-full h-12 bg-gray-300 rounded-md"></div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ItemDetailsSkeleton;