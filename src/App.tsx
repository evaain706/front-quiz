
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Main from './page/Main';
import Layout from './components/Layout';
import OptionSelect from './page/OptionSelect';


function App() {
  const router = createBrowserRouter([
    {
    
      element: <Layout />,
      children: [
        {
          path: '/', 
          element: <Main />
        },
        {
          path: '/select',
          element: <OptionSelect/>
        }
    
      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;