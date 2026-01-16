const CommunityPageSkeleton = () => {
  return (
    <div className='mx-auto flex w-full animate-pulse flex-col items-center gap-5 px-6 md:gap-10 md:px-14'>
      <div className='flex w-full max-w-[90rem] flex-col gap-5'>
        <div className='h-18 w-full rounded-lg bg-gray-300'></div>
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className='h-10 w-full rounded-lg bg-gray-700 md:h-24'
          ></div>
        ))}
      </div>

      <div className='h-10 w-80 rounded-md bg-gray-700'></div>
    </div>
  );
};

export default CommunityPageSkeleton;
