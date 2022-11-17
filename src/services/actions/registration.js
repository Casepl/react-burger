import { createAction } from '@reduxjs/toolkit';
import { registrationApi } from '../auth-api';
import { saveTokens } from '../../utils/token';
import { setUser } from './auth';

export const registrationRequest = createAction('registration/request');
export const registrationSuccess = createAction('registration/success');
export const registrationFail = createAction('registration/fail');



export function registration(form) {
  return function (dispatch) {
    dispatch(registrationRequest());
    registrationApi(form)
      .then((response) => {
        if(response && response.success) {
          saveTokens(response.refreshToken, response.accessToken);
          dispatch(setUser(response.user));
          dispatch(registrationSuccess());
          return;
        }
        dispatch(registrationFail('Упс, что то пошло не так'));
      }).catch((errorMessage) =>{
        dispatch(registrationFail(errorMessage));
    });
  };
}
