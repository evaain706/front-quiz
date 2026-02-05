const UserStatisticsSkeleton = () => {
  return (
    <div className='flex min-h-content flex-col items-center justify-center gap-15 overflow-auto'>
      <div className='w-screen animate-pulse bg-gray-900 p-10 text-white md:w-[70rem] lg:w-[100rem]'>
        <div className='relative mb-6 flex flex-col items-center'>
          <div className='h-[3rem] w-48 rounded-md bg-gray-700'></div>
        </div>

        <div className='mb-8'>
          <div className='mb-4 h-8 w-40 rounded-md bg-gray-700'></div>
          <div className='flex items-center justify-center gap-4'>
            <div className='h-32 w-48 rounded-lg bg-gray-700'></div>
            <div className='h-32 w-48 rounded-lg bg-gray-700'></div>
            <div className='h-32 w-48 rounded-lg bg-gray-700'></div>
          </div>
        </div>

        <div className='mb-8'>
          <div className='mb-4 h-8 w-40 rounded-md bg-gray-700'></div>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className='h-32 w-full rounded-lg bg-gray-700'></div>
            ))}
          </div>
        </div>

        <div>
          <div className='mb-4 h-8 w-40 rounded-md bg-gray-700'></div>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className='h-32 w-full rounded-lg bg-gray-700'></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStatisticsSkeleton;
