import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function ProtectedRoute({ children }) {
  const { pathname } = useLocation();

  const { user } = useSelector((store) => {
    return store.auth;
  });

  if (!user) {
    return (<Navigate state={{redirectTo: pathname }} to='/login' replace />);
  }

  return children;
}
