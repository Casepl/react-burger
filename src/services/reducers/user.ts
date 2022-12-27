import {createReducer, PayloadAction} from '@reduxjs/toolkit';
import {
  userRequest,
  userFail,
  userSuccess,
  userPatchRequest,
  userPatchSuccess,
  userPatchFail
}
  from '../actions/user';

export interface IUserInitialState {
  userRequest: boolean,
  userRequestFailed: boolean,
  errorMessage: string,
  userPatchRequest: boolean,
  userPatchFailed: boolean,
  errorUserPatchMessage: string,
  patchUserMessage: string
}

const initialState: IUserInitialState = {
  userRequest: false,
  userRequestFailed: false,
  errorMessage: '',
  userPatchRequest: false,
  userPatchFailed: false,
  errorUserPatchMessage: '',
  patchUserMessage: '',
};

export const userReducer = createReducer(initialState,
  (builder) => {
    builder
      .addCase(userRequest, (state) => {
        return {
          ...state,
          userRequest: true
        };
      })
      .addCase(userSuccess, (state) => {
        return {
          ...state,
          userRequestFailed: false,
          userRequest: false,
          errorMessage: ''
        };
      })
      .addCase(userFail, (state, action:PayloadAction<string>) => {
        return {
          ...state,
          userRequestFailed: true,
          errorMessage: action.payload,
          userRequest: false
        };
      })
      .addCase(userPatchRequest, (state) => {
      return {
        ...state,
        userPatchRequest: true
      };
    })
      .addCase(userPatchSuccess, (state) => {
        return {
          ...state,
          userPatchFailed: false,
          userPatchRequest: false,
        };
      })
      .addCase(userPatchFail, (state, action: PayloadAction<string>) => {
        return {
          ...state,
          userPatchFailed: true,
          errorUserPatchMessage: action.payload,
          userPatchRequest: false,
          patchUserMessage: ''
        };
      })
  });
