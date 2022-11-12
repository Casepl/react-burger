import { createReducer } from '@reduxjs/toolkit'
import { request, success, error } from '../actions/reset-password';

const initialState = {
  resetPasswordFailed: false,
  message: '',
  errorMessage: '',
  resetPasswordRequest: false
}

export const ResetPasswordReducer  = createReducer(initialState,
  (builder) => {
    builder
      .addCase(request, (state) => {
        return { ...state, resetPasswordRequest: true };
      })
      .addCase(success, (state, action) => {
        return { ...state,  resetPasswordFailed: false,
          message: action.payload, resetPasswordRequest: false, errorMessage: ''};
      })
      .addCase(error, (state, action) => {
        return { ...state, resetPasswordRequest: true,
          errorMessage: action.payload, message: '', resetPasswordFailed: false };
      });
  });
