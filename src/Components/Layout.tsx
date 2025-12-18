import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <div className='bg-navy-black min-h-screen'>
      <Header />

      <main className='mx-auto w-full max-w-[120rem] px-6 pt-24'>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
