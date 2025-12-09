import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useUserStore } from '../store/useUserStore';
import { useToastStore } from '../store/useToastStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = useUserStore((s) => s.user);
  const addToast = useToastStore((s) => s.addToast);

  useEffect(() => {
    if (!user) {
      addToast('warn', '로그인이 필요한 페이지입니다');
    }
  }, [user, addToast]);

  if (!user) {
    return <Navigate to='/main' replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
