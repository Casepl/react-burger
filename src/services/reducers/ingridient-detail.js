import { createReducer } from '@reduxjs/toolkit'
import { selectIngredient, deSelectIngredient }
  from '../actions/ingridient-details';

const initialState = null;

export const ingredientDetailReducer  = createReducer(initialState,
  (builder) => {
    builder
      .addCase(selectIngredient, (state, action) => {
        return action.payload;
      })
      .addCase(deSelectIngredient, () => {
        return null;
      })
  })
