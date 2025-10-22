import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Main from './page/Main';
import Layout from './components/Layout';
import OptionSelect from './page/OptionSelect';
import Quiz from './page/Quiz';
import KakaoCallback from './page/KakaoCallback';
import ProtectedRoute from './components/ProtectedRoute';
import MyPage from './page/MyPage';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main />,
    },
    {
      path: '/oauth',
      element: <KakaoCallback />,
    },

    {
      element: <Layout />,
      children: [
        {
          path: '/select',
          element: <OptionSelect />,
        },
        {
          path: '/quiz',
          element: <Quiz />,
        },
        {
          path: '/mypage',
          element: (
            <ProtectedRoute>
              <MyPage />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
