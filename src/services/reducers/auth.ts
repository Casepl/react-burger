import {createReducer, PayloadAction, PayloadActionCreator} from '@reduxjs/toolkit';
import {
  setUser
}
  from '../actions/auth';

import { IUser } from "../types/data";


interface IAuthState {
    readonly user: null | IUser
}
const initialState: IAuthState = {
  user: null
};

export const authReducer = createReducer(initialState,
  (builder) => {
    builder
      .addCase(setUser, (state, action:PayloadAction<IUser | null>) => {
        return {
          ...state,
          user: action.payload
        };
      })
  });
