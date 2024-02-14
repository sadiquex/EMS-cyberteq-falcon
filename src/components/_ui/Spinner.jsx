export const Spinner = () => {
  return (
    <div
      className="inline-block h-8 w-8 animate-spin mx-auto rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
};

export const FullScreenSpinner = () => {
  return (
    <div className="flex fixed top-0 left-0 items-center justify-center w-full h-full">
      <div className="flex justify-center items-center space-x-1 text-sm text-red-500">
        <svg
          fill="none"
          className="w-6 h-6 animate-spin"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
            fill="currentColor"
            fillRule="evenodd"
          />
        </svg>

        <h2 className="text-xl text-red-400 font-semibold">Loading ...</h2>
      </div>
    </div>
  );
};
