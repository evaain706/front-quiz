import LogoImg from '/logo.png';

const Header = () => {
  return (
    <div className='fixed top-0 mb-[2rem] flex w-full items-center justify-between bg-gray-200 px-[4rem] py-[1rem]'>
      <img src={LogoImg} className='aspect-auto h-20 w-50' />

      <div className='flex gap-20 md:gap-50'>
        <h2>하이</h2>

        <h2>하이</h2>
      </div>
    </div>
  );
};

export default Header;
