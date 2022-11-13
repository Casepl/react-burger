import { createReducer } from '@reduxjs/toolkit';
import {
  setUser
}
  from '../actions/auth';

const initialState = {
  user: null
};

export const authReducer = createReducer(initialState,
  (builder) => {
    builder
      .addCase(setUser, (state, action) => {
        return {
          ...state,
          user: action.payload
        };
      })
  });
