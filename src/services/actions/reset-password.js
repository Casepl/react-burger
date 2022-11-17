import { createAction } from '@reduxjs/toolkit';
import { resetPasswordApi } from '../auth-api';
import { deleteCookie } from '../../utils/cookie';

export const request = createAction('reset-password/request');
export const success = createAction('reset-password/success');
export const error = createAction('reset-password/error');

export function resetPassword(form) {
  return function (dispatch) {
    dispatch(request);
    resetPasswordApi(form)
      .then((response) => {
        if(response && response.success) {
          dispatch(success(response.message));
          deleteCookie('isPasswordReset');
          return;
        }
        dispatch(error('Упс, что то пошло не так'));
      }).catch((errorMessage) =>{
      dispatch(error(errorMessage));
    });
  };
}
