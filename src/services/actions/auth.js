import { createAction } from '@reduxjs/toolkit';
import { refreshTokenRequest } from '../auth-api';
import { saveTokens } from '../../utils/token';

export const setUser = createAction('auth/setUser');

export const refreshToken = (afterRefresh, fail) => (dispatch) => {
  const token = localStorage.getItem('refreshToken');
  refreshTokenRequest({ token })
    .then((res) => {
      saveTokens(res.refreshToken, res.accessToken);
      dispatch(afterRefresh);
    }).catch(()=> {
      dispatch(fail);
    });
};



