import React, { useEffect } from 'react';
import { useDispatch } from '../hooks/useDispatch';
import { useSelector } from '../hooks/useSelector';
import { logout } from '../services/actions/logout';
import { Navigate } from 'react-router-dom';

const Logout = () => {
  const user  = useSelector((store: any) => store.auth);
  const dispatch = useDispatch();

  useEffect(()=>{

    dispatch(logout());
  }, [dispatch]);

  if(!user) {
    return (<Navigate to='/login' replace />)
  }

  return (
    <></>
  );
};

export default Logout;
