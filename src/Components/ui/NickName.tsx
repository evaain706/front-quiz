const NickName = ({ name }: { name: string }) => {
  return (
    <div className='flex h-20 w-20 items-center justify-center rounded-full border-2 border-black bg-gray-100'>
      <h2 className='font-bold'>{name}</h2>
    </div>
  );
};

export default NickName;
