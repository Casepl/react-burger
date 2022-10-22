import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingridients';
import { BurgerConstructorReducer } from './burger-constructor';
import { ingredientDetailReducer } from './ingridient-detail';
import { orderReducer } from './order';
import { TabSwitchReducer } from './tab-switch';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: BurgerConstructorReducer,
  selectIngredient: ingredientDetailReducer,
  order: orderReducer,
  currentTab: TabSwitchReducer
});
