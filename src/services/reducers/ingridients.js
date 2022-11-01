import { createReducer } from '@reduxjs/toolkit'
import { request, success, error, clearError } from '../actions/ingridients';

const initialState = {
  ingredientsFailed: false,
  ingredients: [],
  ingredientsRequest: false
}

export const ingredientsReducer  = createReducer(initialState,
  (builder) => {
  builder
    .addCase(request, (state, action) => {
      return { ...state, ingredientsRequest: true };
    })
    .addCase(success, (state, action) => {
      return { ...state,  ingredientsFailed: false, ingredients: action.payload.items, itemsRequest: false };
    })
    .addCase(error, (state, action) => {
      return { ...state, ingredientsFailed: true, ingredientsRequest: false };
    })
    .addCase(clearError, (state, action) => {
      return { ...state, ingredientsFailed: false };
    });
})
