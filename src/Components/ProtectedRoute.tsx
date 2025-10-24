import { Navigate } from 'react-router-dom';
import { useUserStore } from '../store/useUserStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useUserStore();

  if (!user) {
    console.log('로그인안됨(접근불가)');
    return <Navigate to='/' replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
