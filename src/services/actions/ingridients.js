import { createAction } from '@reduxjs/toolkit';
import fetchIngridients from '../fetch-ingridients';

export const request = createAction('ingredients/request');
export const success = createAction('ingredients/success');
export const error = createAction('ingredients/error');
export const clearError = createAction('ingredients/clearError');

export function getIngredients() {
  return function (dispatch) {
    dispatch(request);
    fetchIngridients()
      .then((res) => {
        if (res && res.success) {
          dispatch(success({ items: res.data }));
        } else {
          dispatch(error());
        }
      }).catch(() =>{
        dispatch(error());
      });
  };
}
