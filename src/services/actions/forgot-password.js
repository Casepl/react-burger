import { createAction } from '@reduxjs/toolkit';
import { forgotPasswordApi } from '../auth-api';
import { setCookie } from '../../utils/cookie';

export const request = createAction('reset-password/request');
export const success = createAction('reset-password/success');
export const error = createAction('reset-password/error');

export function forgotPassword(email) {
  return function (dispatch) {
    dispatch(request);
    forgotPasswordApi(email)
      .then((response) => {
        if(response && response.success) {
          dispatch(success(response.message));
          setCookie('isPasswordReset', true);
          return;
        }
        dispatch(error('Упс, что то пошло не так'));
      }).catch((errorMessage) =>{
      dispatch(error(errorMessage));
    });
  };
}
