import { createAction } from '@reduxjs/toolkit';
import {ConstructorElementArrayType, ConstructorElementProps} from "../../constants/burgers-prop-type";

export interface IRemoveComponent {
    dragId: string
}
export const addComponent = createAction<ConstructorElementProps, 'burgerConstructor/addComponent'>('burgerConstructor/addComponent');
export const updateConstructorList = createAction<ConstructorElementArrayType, 'burgerConstructor/updateConstructorList'>('burgerConstructor/updateConstructorList');
export const removeComponent = createAction<IRemoveComponent, 'burgerConstructor/removeComponent'>('burgerConstructor/removeComponent');
export const clearConstructor = createAction('burgerConstructor/clearConstructor');
