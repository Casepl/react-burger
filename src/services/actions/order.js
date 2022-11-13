import { createAction } from '@reduxjs/toolkit';
import sendOrder from '../send-order';
import { clearConstructor } from './burger-constructor';

export const request = createAction('order/request');
export const success = createAction('order/success');
export const error = createAction('order/error');
export const clearOrder = createAction('order/clearOrder');
export const clearError = createAction('ingredients/clearError');

export function applyOrder(ingridients) {
  return function (dispatch) {
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
