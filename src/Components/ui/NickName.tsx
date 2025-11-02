const NickName = ({ name }: { name: string }) => {
  return (
    <div className='flex h-20 w-20 flex-wrap items-center justify-center rounded-full border-2 border-black bg-white'>
      <h2 className='w-[30ch] truncate text-xl font-bold'>{name}</h2>
    </div>
  );
};

export default NickName;
