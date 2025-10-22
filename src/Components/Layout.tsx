import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <div className='bg-navy-black flex h-screen flex-col items-center justify-center'>
      <Header />

      <div className='mx-auto flex max-w-[120rem] items-center justify-center'>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
