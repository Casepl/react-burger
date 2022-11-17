import { createReducer } from '@reduxjs/toolkit'
import { request, success, error } from '../actions/forgot-password';

const initialState = {
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
      .addCase(success, (state, action) => {
        return { ...state,  forgotPasswordFailed: false,
          message: action.payload, forgotPasswordRequest: false, errorMessage: '', isPasswordReset: true };
      })
      .addCase(error, (state, action) => {
        return { ...state, forgotPasswordFailed: true,
          errorMessage: action.payload, message: '', forgotPasswordRequest: false, isPasswordReset: false };
      });
  });
