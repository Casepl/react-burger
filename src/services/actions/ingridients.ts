import { createAction } from '@reduxjs/toolkit';
import fetchIngridients from '../fetch-ingridients';
import {AppDispatch, AppThunk} from "../types";
import {IIngredientActionGet} from "../types/data";



export const request = createAction('ingredients/request');
export const success = createAction<IIngredientActionGet, 'ingredients/success'>('ingredients/success');
export const error = createAction('ingredients/error');
export const clearError = createAction('ingredients/clearError');

export function getIngredients(): AppThunk {
  return function (dispatch: AppDispatch) {
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
