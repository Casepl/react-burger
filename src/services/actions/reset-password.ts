import { createAction } from '@reduxjs/toolkit';
import { resetPasswordApi } from '../auth-api';
import { deleteCookie } from '../../utils/cookie';
import {AppDispatch} from "../types";
import {IResetPasswordForm} from "../types/data";

export const request = createAction('reset-password/request');
export const success = createAction<string, 'reset-password/success'>('reset-password/success');
export const error = createAction<string, 'reset-password/error'>('reset-password/error');

export function resetPassword(form: IResetPasswordForm) {
  return function (dispatch: AppDispatch) {
    dispatch(request);
    resetPasswordApi(form)
      .then((response) => {
        if(response && response.success) {
          dispatch(success(response.message || ''));
          deleteCookie('isPasswordReset');
          return;
        }
        dispatch(error('Упс, что то пошло не так'));
      }).catch((errorMessage) =>{
      dispatch(error(errorMessage));
    });
  };
}
