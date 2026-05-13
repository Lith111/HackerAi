import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!token) {
    // إعادة توجيه إلى صفحة الدخول مع حفظ المسار الذي حاول الوصول إليه
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;