import { createReducer } from '@reduxjs/toolkit';
import {
  registrationRequest, registrationSuccess, registrationFail
}
  from '../actions/registration';

const initialState = {
  registrationRequest: false,
  registrationFailed: false,
  errorMessage: ''
};

export const RegistrationReducer = createReducer(initialState,
  (builder) => {
    builder
      .addCase(registrationRequest, (state) => {
        return {
          ...state,
          registrationRequest: true
        };
      })
      .addCase(registrationSuccess, (state, action) => {
        return {
          ...state,
          registrationFailed: false,
          user: action.payload,
          registrationRequest: false,
          errorMessage: ''
        };
      })
      .addCase(registrationFail, (state, action) => {
        return {
          ...state,
          registrationFailed: true,
          errorMessage: action.payload,
          registrationRequest: false
        };
      });
  });
