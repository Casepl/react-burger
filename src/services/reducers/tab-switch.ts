import { createReducer } from '@reduxjs/toolkit'
import { tabSwitch } from '../actions/tab-switch';

const initialState = 'bun'

export const tabSwitchReducer  = createReducer(initialState,
  (builder) => {
    builder
      .addCase(tabSwitch, (state, action) => {
          return action.payload;
      });
  })
