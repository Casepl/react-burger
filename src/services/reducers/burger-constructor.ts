import {createReducer, PayloadAction} from '@reduxjs/toolkit';
import {
  addComponent, clearConstructor,
  removeComponent,
  updateConstructorList
} from '../actions/burger-constructor';
import {ConstructorElementProps} from "../../constants/burgers-prop-type";

const initialState: ConstructorElementProps[] = []

export const burgerConstructorReducer  = createReducer(initialState,
  (builder) => {
    builder
      .addCase(addComponent, (state, action: PayloadAction<ConstructorElementProps>) => {
        const newState = [...state];

        if(action.payload.type === 'bun') {
          const findIndex = newState.findIndex((item) => item.type === 'bun');
          if(findIndex !== -1) {
            newState[findIndex] = action.payload;
          } else {
            newState.push(action.payload);
          }
        } else {
          newState.push(action.payload);
        }

        return newState;
      })
      .addCase(updateConstructorList, (state, action) => {
        return action.payload;
      })
      .addCase(removeComponent, (state, action) => {
        return state.filter((item) =>
          item.dragId !== action.payload.dragId);
      }).addCase(clearConstructor, () => {
        return initialState;
    })
  })
