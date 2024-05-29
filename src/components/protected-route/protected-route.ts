import React from 'react';
import { useSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthCheckedSelector } from '../../services/slices/userSlice';

type ProtectedRouteProps = {
    onlyUnAuth?: boolean;
    children: React.ReactElement;
  };

//export const ProtectedRoute = ({
  //onlyUnAuth = false,
  //children
  //}: ProtectedRouteProps) => {
    //const isAuthChecked = useSelector(isAuthCheckedSelector);
    //const location = useLocation();

  //if (!onlyUnAuth && !isAuthChecked) {
    //return <Navigate to='/login' state={{ from: location }} />;
  //}

  //if (onlyUnAuth && isAuthChecked) {
    //const from = location.state?.from || {from: { pathname: '/' } };
    //return <Navigate replace to={from} />;
  //}
  //return children;
  //};
