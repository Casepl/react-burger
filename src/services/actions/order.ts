import { createAction } from '@reduxjs/toolkit';
import sendOrder from '../send-order';
import { clearConstructor } from './burger-constructor';
import {ConstructorElementArrayType} from "../../constants/burgers-prop-type";
import {AppDispatch} from "../types";

export const request = createAction('order/request');
export const success = createAction<{number: number}, 'order/success'>('order/success');
export const error = createAction('order/error');
export const clearOrder = createAction('order/clearOrder');
export const clearError = createAction('ingredients/clearError');

export function applyOrder(ingridients: ConstructorElementArrayType) {
  return function (dispatch: AppDispatch) {
    dispatch(request());
    sendOrder(ingridients)
      .then((order) => {
          dispatch(success(order));
          dispatch(clearConstructor())
      }).catch(() =>{
        dispatch(error());
      });
  };
}
