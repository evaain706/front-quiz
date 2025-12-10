const CommunityPostListSkeletion = () => {
  return (
    <div className='w-[30rem] overflow-hidden rounded-xl border border-gray-300 bg-white shadow-sm md:w-[80rem] md:max-w-[120rem]'>
      <div className='grid grid-cols-3 border-b bg-gray-100 px-4 py-3 text-[1.4rem] font-bold text-white'>
        <p>카테고리</p>
        <p>작성자</p>
        <p>제목</p>
      </div>

      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className='grid animate-pulse grid-cols-3 border-b px-4 py-5 md:py-10'
        >
          <div className='h-6 w-16 rounded bg-gray-300'></div>
          <div className='h-6 w-20 rounded bg-gray-300'></div>
          <div className='h-6 w-full rounded bg-gray-300'></div>
        </div>
      ))}
    </div>
  );
};

export default CommunityPostListSkeletion;
