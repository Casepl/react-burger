import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingridients';
import { BurgerConstructorReducer } from './burger-constructor';
import { orderReducer } from './order';
import { TabSwitchReducer } from './tab-switch';
import { forgotPasswordReducer } from './forgot-password';
import { AuthReducer } from './auth';
import { LoginReducer } from './login';
import { RegistrationReducer } from './registration';
import { ResetPasswordReducer } from './reset-password';
import { UserReducer } from './user';
import { LogoutReducer } from './logout';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: BurgerConstructorReducer,
  order: orderReducer,
  currentTab: TabSwitchReducer,
  login: LoginReducer,
  registration: RegistrationReducer,
  user: UserReducer,
  auth: AuthReducer,
  logout: LogoutReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: ResetPasswordReducer
});
