import { createAction } from '@reduxjs/toolkit';
import { loginApi } from '../auth-api';
import { saveTokens } from '../../utils/token';
import { setUser } from './auth';
import {AppDispatch, AppThunk} from "../types";
import {ILoginForm} from "../types/data";

export const loginRequest = createAction('login/request');
export const loginSuccess = createAction('login/success');
export const loginFail = createAction<string, 'login/fail'>('login/fail');

export function login(form: ILoginForm): AppThunk {
  return function (dispatch: AppDispatch) {
    dispatch(loginRequest);
    loginApi(form)
      .then((response) => {
        if(response && response.success) {
          saveTokens(response.refreshToken, response.accessToken);
          dispatch(setUser(response.user));
          dispatch(loginSuccess());
          return;
        }

        dispatch(loginFail('Упс, что то пошло не так'));
      }).catch((errorMessage) =>{
      dispatch(loginFail(errorMessage));
    });
  };
}
