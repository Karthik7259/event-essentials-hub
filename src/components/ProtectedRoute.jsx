import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

/**
 * ProtectedRoute component - Redirects to auth page if user is not authenticated
 */
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;
