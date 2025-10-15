
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <div>
   
      <Header />
      
      <div className='max-w-[120rem] flex justify-center items-center mx-auto '>
        <Outlet /> 
      </div>
      
   
    </div>
  );
};

export default Layout;