
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Main from './page/Main';
import Layout from './Components/Layout';


function App() {
  const router = createBrowserRouter([
    {
    
      element: <Layout />,
      children: [
        {
          path: '/', 
          element: <Main />
        },
    
      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;