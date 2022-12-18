import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingridients';
import { burgerConstructorReducer } from './burger-constructor';
import { orderReducer } from './order';
import { tabSwitchReducer } from './tab-switch';
import { forgotPasswordReducer } from './forgot-password';
import { authReducer } from './auth';
import { loginReducer } from './login';
import { registrationReducer } from './registration';
import { resetPasswordReducer } from './reset-password';
import { userReducer } from './user';
import { logoutReducer } from './logout';
import { feedReducer } from './feed';
import { profileOrdersReducer } from './orders';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  order: orderReducer,
  currentTab: tabSwitchReducer,
  login: loginReducer,
  registration: registrationReducer,
  user: userReducer,
  auth: authReducer,
  logout: logoutReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
  feed: feedReducer,
  profileOrders: profileOrdersReducer
});
