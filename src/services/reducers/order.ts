import { createReducer } from '@reduxjs/toolkit'
import { request, success, error, clearOrder, clearError } from '../actions/order';
import { IOrderResponse } from "../types/data";

interface IOrderState {
  orderFailed: boolean;
  response: null | { number: number },
  orderRequest: boolean
}

const initialState: IOrderState = {
  orderFailed: false,
  response: null,
  orderRequest: false
}

export const orderReducer  = createReducer(initialState,
  (builder) => {
    builder
      .addCase(request, (state, action) => {
        return { ...state, orderRequest: true };
      })
      .addCase(success, (state, action) => {
        return { ...state,  orderFailed: false, response: action.payload, orderRequest: false };
      })
      .addCase(error, (state,) => {
        return { ...state, orderFailed: true, response: null, orderRequest: false };
      })
      .addCase(clearOrder, (state, action) => {
        return { ...state,  response: null };
      })
      .addCase(clearError, (state, action) => {
        return { ...state,  orderFailed: false };
      });
  })
