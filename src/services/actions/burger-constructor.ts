import { createAction } from '@reduxjs/toolkit';
import {ConstructorElementProps} from "../../constants/burgers-prop-type";


export const addComponent = createAction<ConstructorElementProps, 'burgerConstructor/addComponent'>('burgerConstructor/addComponent');
export const updateConstructorList = createAction('burgerConstructor/updateConstructorList');
export const removeComponent = createAction<ConstructorElementProps, 'burgerConstructor/removeComponent'>('burgerConstructor/removeComponent');
export const clearConstructor = createAction('burgerConstructor/clearConstructor');
