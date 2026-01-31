export const OptionsCardSkeleton = () => (
  <div className='mt-8 mb-8 min-h-[15rem] w-full md:w-[70rem] lg:w-[90rem]'>
    <div className='rounded-md border border-gray-200 bg-white/10 p-6 shadow-sm'>
      <div className='animate-pulse space-y-3'>
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className='flex items-center gap-4 rounded-lg border-2 border-gray-200 p-6'
          >
            <div className='h-8 w-full rounded bg-gray-300' />
          </div>
        ))}
      </div>
    </div>
  </div>
);