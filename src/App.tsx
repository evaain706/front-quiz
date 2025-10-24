import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import './index.css';
import Main from './page/Main';
import Layout from './components/Layout';
import OptionSelect from './page/OptionSelect';
import Quiz from './page/Quiz';
import KakaoCallback from './page/KakaoCallback';
import ProtectedRoute from './components/ProtectedRoute';
import MyPage from './page/MyPage';

const queryClient = new QueryClient();

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

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
