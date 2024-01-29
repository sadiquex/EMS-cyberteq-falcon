export const CardSkeleton = () => {
  return (
    <div className="max-w-[300px] animate-pulse h-[140px] p-6 bg-gray-200">
      <div className="h-2.5 bg-gray-400 rounded-full w-48 mb-4"></div>
      <div className="h-2 bg-gray-400 rounded-full max-w-[360px] mb-2.5"></div>
      <div className="h-2 bg-gray-400 rounded-full mb-2.5"></div>
      <div className="h-2 bg-gray-400 rounded-full max-w-[330px] mb-2.5"></div>
      <div className="h-2 bg-gray-400 rounded-full max-w-[300px] mb-2.5"></div>
      <div className="h-2 bg-gray-400 rounded-full max-w-[360px]"></div>
      {/* <span className="sr-only">Loading...</span> */}
    </div>
  );
};

export const TableSkeleton = () => {
  return (
    <div
      role="status"
      className="max-w-full p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse bg-gray-100"
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
          <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full w-1/3"></div>
      </div>
      <div className="flex items-center justify-between pt-4">
        <div>
          <div className="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
          <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full w-1/3"></div>
      </div>
      <div className="flex items-center justify-between pt-4">
        <div>
          <div className="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
          <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full w-1/3"></div>
      </div>
      <div className="flex items-center justify-between pt-4">
        <div>
          <div className="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
          <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full w-1/3"></div>
      </div>
      <div className="flex items-center justify-between pt-4">
        <div>
          <div className="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
          <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full w-1/3"></div>
      </div>
      {/* <span className="sr-only">Loading...</span> */}
    </div>
  );
};
