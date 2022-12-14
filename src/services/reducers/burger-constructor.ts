import {createReducer, PayloadAction} from '@reduxjs/toolkit';
import {
    addComponent, clearConstructor, IRemoveComponent,
    removeComponent,
    updateConstructorList
} from '../actions/burger-constructor';
import {ConstructorElementArrayType} from "../../constants/burgers-prop-type";

const initialState: ConstructorElementArrayType = []

export const burgerConstructorReducer  = createReducer(initialState,
  (builder) => {
    builder
      .addCase(addComponent, (state, action) => {
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
      .addCase(removeComponent, (state, action: PayloadAction<IRemoveComponent>) => {
        return state.filter((item) =>
          item.dragId !== action.payload.dragId);
      }).addCase(clearConstructor, () => {
        return initialState;
    })
  })
