import { useSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector((state) => state.user.isAuthChecked);
  const user = useSelector((state) => state.user.user);
  const location = useLocation();

  //if (!onlyUnAuth && !user.name) {
  //return <Navigate to='/login' state={{ from: location }} />;
  //}

  //if (onlyUnAuth && user.name) {
  //const { from } = location.state?.from || { from: { pathname: '/' } };
  //return <Navigate replace to={from} />;
  //}

  return children;
};
