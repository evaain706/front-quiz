const CommunityDetailSkeleton = () => {
  return (
    <div className='mt-5 flex min-h-[calc(100vh-6rem)] animate-pulse items-center justify-center'>
      <div className='relative mx-auto w-full bg-white'>
        <div className='rounded-md bg-white shadow-xl ring-1 ring-slate-100'>
          <header className='border-b border-slate-100 px-6 py-6 sm:px-8'>
            <div className='h-8 w-3/4 rounded bg-gray-300'></div>
            <div className='mt-4 flex items-center gap-4'>
              <div className='h-6 w-10 rounded bg-gray-300'></div>
              <div className='h-6 w-1/4 rounded bg-gray-300'></div>
            </div>
          </header>
          <div className='px-6 py-8 sm:px-8'>
            <div className='space-y-3'>
              <div className='h-6 rounded bg-gray-300'></div>
              <div className='h-6 w-5/6 rounded bg-gray-300'></div>
              <div className='h-6 w-4/6 rounded bg-gray-300'></div>
            </div>
            <div className='mt-8 flex justify-end border-t border-slate-100 pt-6'>
              <div className='h-8 w-8 rounded-full bg-gray-300'></div>
            </div>
          </div>
        </div>

        <section className='mt-10'>
          <h2 className='mb-6 pl-5 text-[1.6rem] font-bold text-slate-900'>
            <div className='h-7 w-24 rounded bg-gray-300'></div>
          </h2>
          <div className='max-h-[50rem] space-y-4 overflow-y-auto'>
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className='rounded-xl bg-white p-10 shadow-sm ring-1 ring-slate-100'
              >
                <div className='flex justify-between'>
                  <div className='w-full'>
                    <div className='h-6 w-1/5 rounded bg-gray-300'></div>
                    <div className='mt-2 h-6 w-4/5 rounded bg-gray-300'></div>
                  </div>
                  <div className='h-10 w-12 rounded-lg bg-gray-300'></div>
                </div>
              </div>
            ))}
          </div>
          <div className='my-8 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent' />
        </section>

        <div className='p-6 shadow-sm ring-1 ring-slate-100'>
          <h3 className='mb-5 text-[1.6rem] font-bold'>
            <div className='h-7 w-32 rounded bg-gray-300'></div>
          </h3>
          <div className='space-y-4'>
            <div className='grid gap-4 sm:grid-cols-2'>
              <div className='h-12 w-full rounded-lg bg-gray-300'></div>
              <div className='h-12 w-full rounded-lg bg-gray-300'></div>
            </div>
            <div className='h-24 w-full rounded-lg bg-gray-300'></div>
            <div className='flex justify-end'>
              <div className='h-12 w-24 rounded-lg bg-gray-300'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityDetailSkeleton;
