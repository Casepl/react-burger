import {createReducer, PayloadAction} from '@reduxjs/toolkit'
import {request, success, error} from '../actions/forgot-password';

interface IForgotPassword {
  forgotPasswordFailed: boolean,
  message: string,
  errorMessage: string,
  isPasswordReset: boolean,
  forgotPasswordRequest: boolean
}
const initialState: IForgotPassword = {
  forgotPasswordFailed: false,
  message: '',
  errorMessage: '',
  isPasswordReset: false,
  forgotPasswordRequest: false
}

export const forgotPasswordReducer  = createReducer(initialState,
  (builder) => {
    builder
      .addCase(request, (state) => {
        return { ...state, forgotPasswordRequest: true };
      })
      .addCase(success, (state, action: PayloadAction<string>) => {
        return { ...state,  forgotPasswordFailed: false,
          message: action.payload, forgotPasswordRequest: false, errorMessage: '', isPasswordReset: true };
      })
        .addCase(error, (state, action: PayloadAction<string>) => {
        return { ...state, forgotPasswordFailed: true,
          errorMessage: action.payload, message: '', forgotPasswordRequest: false, isPasswordReset: false };
      });
  });
