import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import './index.css';
import Layout from '@/components/Layout';
import OptionSelect from '@/page/OptionSelectPage';
import Quiz from '@/page/QuizPage';
import KakaoCallback from '@/page/KakaoCallback';
import ProtectedRoute from '@/components/ProtectedRoute';
import MyPage from '@/page/MyPage';
import NotFound from '@/page/NotFound';
import LandingPage from '@/page/LandingPage';
import MainPage from '@/page/MainPage';
import ToastContainer from '@/components/ui/Toast/ToastContainer';
import CommunityPage from '@/page/CommunityPage';
import CommunityForm from '@/features/Community/CommunityForm';
import CommunityDetail from '@/features/Community/CommunityDetail';
import UserStatisticPage from '@/features/myPage/UserStatistics/UserStatistics';
import UserSettingPage from '@/features/myPage/UserSetting/UserSetting';
import IncorrectAnswerPage from '@/features/myPage/IncorrectAnswers/IncorrectAnswer';

const queryClient = new QueryClient();



function App() {

  


  const router = createBrowserRouter([
    {
      path: '/',
      element: <LandingPage />,
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
          path: '/main',
          element: <MainPage />,
        },
        {
          path: '/community',
          element: <CommunityPage />,
        },
        {
          path: '/community/create',
          element: <CommunityForm />,
        },
        {
          path: '/community/detail/:id',
          element: <CommunityDetail />,
        },

        {
          path: '/mypage',
          element: (
            <ProtectedRoute>
              <MyPage />
            </ProtectedRoute>
          ),
        },
        {
          path: '/mypage/statistics',
          element: (
            <ProtectedRoute>
              <UserStatisticPage />
            </ProtectedRoute>
          ),
        },
        {
          path: '/mypage/setting',
          element: (
            <ProtectedRoute>
              <UserSettingPage />
            </ProtectedRoute>
          ),
        },
        {
          path: '/mypage/incorrectAnswer',
          element: (
            <ProtectedRoute>
              <IncorrectAnswerPage />
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
