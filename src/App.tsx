
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Main from './page/Main';
import Layout from './components/Layout';
import OptionSelect from './page/OptionSelect';
import Quiz from './page/Quiz';


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
        },
         {
          path: '/quiz',
          element: <Quiz/>
        }
    
      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;