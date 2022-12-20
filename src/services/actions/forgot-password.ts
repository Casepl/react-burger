import { createAction } from '@reduxjs/toolkit';
import { forgotPasswordApi } from '../auth-api';
import { setCookie, deleteCookie } from '../../utils/cookie';
import {AppDispatch, AppThunk} from "../types";

export const request = createAction('forgot-password/request');
export const success = createAction<string, 'forgot-password/success'>('forgot-password/success');
export const error = createAction<string, 'forgot-password/error'>('forgot-password/error');

export function forgotPassword(email: string): AppThunk {
  return function (dispatch: AppDispatch) {
    dispatch(request);
    forgotPasswordApi(email)
      .then((response) => {
        if(response && response.success) {
          setCookie('isPasswordReset', true);
          dispatch(success(response.message || ''));
          return;
        }

        deleteCookie('isPasswordReset');
        dispatch(error('Упс, что то пошло не так'));
      }).catch((errorMessage) => {
        deleteCookie('isPasswordReset');
        dispatch(error(errorMessage));
    });
  };
}
