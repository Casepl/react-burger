import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

interface IProtectedRouteProps {
  children: JSX.Element
}

export function ProtectedRoute({ children }: IProtectedRouteProps) {
  const { pathname } = useLocation();

  const { user } = useSelector((store: any) => {
    return store.auth;
  });

  if (!user) {
    return (<Navigate state={{redirectTo: pathname }} to='/login' replace />);
  }

  return children;
}
