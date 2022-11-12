import { createReducer } from '@reduxjs/toolkit';
import {
  userRequest,
  userFail,
  userSuccess,
  userPatchRequest,
  userPatchSuccess,
  userPatchFail
}
  from '../actions/user';

const initialState = {
  userRequest: false,
  userRequestFailed: false,
  errorMessage: '',
  userPatchRequest: false,
  userPatchFailed: false,
  errorUserPatchMessage: '',
  patchUserMessage: '',
};

export const UserReducer = createReducer(initialState,
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
      .addCase(userFail, (state, action) => {
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
      .addCase(userPatchSuccess, (state, action) => {
        return {
          ...state,
          userPatchFailed: false,
          userPatchRequest: false,
          patchUserMessage: action.payload
        };
      })
      .addCase(userPatchFail, (state, action) => {
        return {
          ...state,
          userPatchFailed: true,
          errorUserPatchMessage: action.payload,
          userPatchRequest: false,
          patchUserMessage: ''
        };
      })
  });
