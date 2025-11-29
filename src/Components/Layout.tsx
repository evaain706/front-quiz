import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <div className='bg-navy-black min-h-screen'>
      <Header />

      <div className='mx-auto flex min-h-screen max-w-[120rem] items-center justify-center pt-[7rem]'>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
