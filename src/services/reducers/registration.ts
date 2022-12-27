import {createReducer, PayloadAction} from '@reduxjs/toolkit';
import {
  registrationRequest, registrationSuccess, registrationFail
}
  from '../actions/registration';

export interface IRegistrationState {
  registrationRequest: boolean,
  registrationFailed: boolean,
  errorMessage: string
}

const initialState: IRegistrationState = {
  registrationRequest: false,
  registrationFailed: false,
  errorMessage: ''
};

export const registrationReducer = createReducer(initialState,
  (builder) => {
    builder
      .addCase(registrationRequest, (state) => {
        return {
          ...state,
          registrationRequest: true
        };
      })
      .addCase(registrationSuccess, (state) => {
        return {
          ...state,
          registrationFailed: false,
          registrationRequest: false,
          errorMessage: ''
        };
      })
      .addCase(registrationFail, (state, action: PayloadAction<string>) => {
        return {
          ...state,
          registrationFailed: true,
          errorMessage: action.payload,
          registrationRequest: false
        };
      });
  });
