import { createReducer } from '@reduxjs/toolkit'
import { request, success, error } from '../actions/reset-password';

const initialState = {
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
      .addCase(success, (state, action) => {
        return { ...state,  resetPasswordFailed: false,
          message: action.payload, resetPasswordRequest: false,
          errorMessage: '', isPasswordResetSuccess: true };
      })
      .addCase(error, (state, action) => {
        return { ...state, resetPasswordRequest: true,
          isPasswordResetSuccess: false,
          errorMessage: action.payload, message: '',
          resetPasswordFailed: false };
      });
  });
