import {createReducer, PayloadAction} from '@reduxjs/toolkit'
import { request, success, error, clearError } from '../actions/ingridients';
import {IIngredientActionGet} from "../types/data";
import {IIngredientProps} from "../../constants/burgers-prop-type";

export interface IIngredientsState {
  ingredientsFailed: boolean,
  ingredients: IIngredientProps[],
  ingredientsRequest: boolean
}


const initialState: IIngredientsState = {
  ingredientsFailed: false,
  ingredients: [],
  ingredientsRequest: false
}

export const ingredientsReducer  = createReducer(initialState,
  (builder) => {
  builder
    .addCase(request, (state) => {
      return { ...state, ingredientsRequest: true };
    })
    .addCase(success, (state, action: PayloadAction<IIngredientActionGet>) => {
      return { ...state,  ingredientsFailed: false, ingredients: action.payload.items, ingredientsRequest: false };
    })
    .addCase(error, (state) => {
      return { ...state, ingredientsFailed: true, ingredientsRequest: false };
    })
    .addCase(clearError, (state) => {
      return { ...state, ingredientsFailed: false };
    });
})
