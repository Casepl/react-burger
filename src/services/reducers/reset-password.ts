import {createReducer, PayloadAction} from '@reduxjs/toolkit'
import { request, success, error } from '../actions/reset-password';

interface IResetPasswordState {
  resetPasswordFailed: boolean,
  message: string,
  errorMessage: string,
  isPasswordResetSuccess: boolean,
  resetPasswordRequest: boolean
}

const initialState: IResetPasswordState = {
  resetPasswordFailed: false,
  message: '',
  errorMessage: '',
  isPasswordResetSuccess: false,
  resetPasswordRequest: false
}

export const resetPasswordReducer  = createReducer(initialState,
  (builder) => {
    builder
      .addCase(request, (state) => {
        return { ...state, resetPasswordRequest: true };
      })
      .addCase(success, (state, action: PayloadAction<string>) => {
        return { ...state,  resetPasswordFailed: false,
          message: action.payload, resetPasswordRequest: false,
          errorMessage: '', isPasswordResetSuccess: true };
      })
      .addCase(error, (state, action: PayloadAction<string>) => {
        return { ...state, resetPasswordRequest: true,
          isPasswordResetSuccess: false,
          errorMessage: action.payload, message: '',
          resetPasswordFailed: false };
      });
  });
