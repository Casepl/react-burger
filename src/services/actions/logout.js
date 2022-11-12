import { createAction } from '@reduxjs/toolkit';
import { loginOutApi } from '../auth-api';
import { deleteTokens } from '../../utils/token';
import { setUser } from './auth';

export const logoutRequest = createAction('logout/request');
export const logoutSuccess = createAction('logout/success');
export const logoutFail = createAction('logout/fail');
export const clearLogoutError = createAction('logout/clearLogoutError');

export function logout(form) {
  return function (dispatch) {
    dispatch(logoutRequest());
    loginOutApi({ token: localStorage.getItem('refreshToken')})
      .then((response) => {
        if(response && response.success) {
          deleteTokens();
          dispatch(setUser(null));
          dispatch(logoutSuccess());
          return;
        }

        dispatch(logoutFail('Упс, что то пошло не так'));
      }).catch((errorMessage) =>{
        dispatch(logoutFail(errorMessage));
    });
  };
}
