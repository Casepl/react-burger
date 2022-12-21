import { createReducer } from '@reduxjs/toolkit';
import {
  logoutRequest, logoutSuccess, logoutFail, clearLogoutError,
}
  from '../actions/logout';

export interface ILogoutInitialState{
  logoutRequest: boolean
  logoutRequestFailed: boolean
  errorMessage: string
}

const initialState: ILogoutInitialState = {
  logoutRequest: false,
  logoutRequestFailed: false,
  errorMessage: ''
};

export const logoutReducer = createReducer(initialState,
  (builder) => {
    builder
      .addCase(logoutRequest, (state) => {
        return {
          ...state,
          logoutRequest: true
        };
      })
      .addCase(logoutSuccess, (state) => {
        return {
          ...state,
          logoutRequestFailed: false,
          errorMessage: ''
        };
      })
      .addCase(logoutFail, (state, action) => {
        return {
          ...state,
          logoutRequestFailed: true,
          errorMessage: action.payload,
          logoutRequest: false
        };
      })
      .addCase(clearLogoutError, (state) =>{
        return {
          ...state,
          errorMessage: '',
        };
      })
  });
