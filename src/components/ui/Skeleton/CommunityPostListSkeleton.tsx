const CommunityPageSkeleton = () => {
  return (
    <div className='mx-auto flex w-full animate-pulse flex-col items-center gap-5 p-6 md:gap-10 md:p-14'>
      <div className='h-[2rem] w-64 rounded-md bg-gray-700 md:h-[3rem]'></div>

      <div className='flex gap-2 rounded-2xl bg-white/10 p-1.5 backdrop-blur-sm'>
        <div className='h-[4rem] w-24 rounded-xl bg-gray-700 md:w-32'></div>
        <div className='h-[4rem] w-24 rounded-xl bg-gray-700 md:w-32'></div>
        <div className='h-[4rem] w-24 rounded-xl bg-gray-700 md:w-32'></div>
      </div>

      <div className='h-14 w-64 rounded-xl bg-white/5'></div>

      <div className='flex w-full max-w-[90rem] flex-col gap-5'>
        <div className='h-18 w-full rounded-lg bg-gray-300'></div>
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className='h-10 w-full rounded-lg bg-gray-700 md:h-26'
          ></div>
        ))}
      </div>

      <div className='h-12 w-80 rounded-md bg-gray-700'></div>

      <div className='h-16 w-48 rounded-md bg-gray-700'></div>
    </div>
  );
};

export default CommunityPageSkeleton;
