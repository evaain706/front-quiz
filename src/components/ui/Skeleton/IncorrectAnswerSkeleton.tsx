const IncorrectAnswerSkeleton = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className='w-full animate-pulse rounded-xl border border-gray-300 bg-white/10 px-10 py-8 shadow-sm'
        >
          <div className='h-8 w-3/4 rounded bg-gray-400'></div>

          <div className='mt-4 flex justify-between'>
            <div className='mt-2 flex flex-col gap-3'>
              <div className='h-6 w-24 rounded bg-gray-400'></div>
              <div className='h-6 w-16 rounded bg-gray-400'></div>
            </div>

            <div className='h-8 w-8 rounded bg-gray-400'></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default IncorrectAnswerSkeleton;