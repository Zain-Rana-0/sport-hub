import { Navigate, useLocation } from 'react-router-dom';

export const ProtectedRoute = ({ children, authRequired = false }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const location = useLocation();



  if (authRequired && !user) {
    // Redirect to login if authentication is required but user is not logged in
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!authRequired && user) {
    // Redirect to home if authentication is not required but user is logged in
    return <Navigate to="/" replace />;
  }

  return children;
};
