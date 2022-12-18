import { createAction } from '@reduxjs/toolkit';
import { registrationApi } from '../auth-api';
import { saveTokens } from '../../utils/token';
import { setUser } from './auth';
import {AppDispatch, AppThunk} from "../types";

export const registrationRequest = createAction('registration/request');
export const registrationSuccess = createAction('registration/success');
export const registrationFail = createAction<string, 'registration/fail'>('registration/fail');


interface IRegistrationAction {
    name: string,
    email: string,
    password: string
}
export function registration(form: IRegistrationAction): AppThunk{
  return function (dispatch: AppDispatch) {
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
