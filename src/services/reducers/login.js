import { createReducer } from '@reduxjs/toolkit';
import {
  loginRequest, loginSuccess, loginFail,
}
  from '../actions/login';

const initialState = {
  loginRequest: false,
  loginRequestFailed: false,
  errorMessage: '',
};

export const loginReducer = createReducer(initialState,
  (builder) => {
    builder
      .addCase(loginRequest, (state) => {
        return {
          ...state,
          loginRequest: true
        };
      })
      .addCase(loginSuccess, (state) => {
        return {
          ...state,
          loginRequestFailed: false,
          loginRequest: false,
          errorMessage: ''
        };
      })
      .addCase(loginFail, (state, action) => {
        return {
          ...state,
          loginRequestFailed: true,
          errorMessage: action.payload,
          loginRequest: false
        };
      })
  });
