import { burgerConstructorReducer } from './burger-constructor';
import { addComponent, clearConstructor, updateConstructorList, removeComponent } from '../actions/burger-constructor';
import {BurgerConstructorItem, dragId} from './__fixtures__/burger-constructor'
import {ConstructorElementArrayType} from "../../constants/burgers-prop-type";


describe('Check burger constructor reducer', () =>{
    test('should return the initial state', () => {
        expect(burgerConstructorReducer(undefined, { type: undefined })).toEqual([])
    });

    test('should handle add ingredient to empty list', () => {
        const initialState: ConstructorElementArrayType = []

        expect(burgerConstructorReducer(initialState, addComponent(BurgerConstructorItem))).toEqual([
            BurgerConstructorItem
        ])
    });

    test('should handle rewrite ingredient list', () => {
        const initialState: ConstructorElementArrayType = []

        const payload = [
            BurgerConstructorItem,
            BurgerConstructorItem,
        ]
        expect(burgerConstructorReducer(initialState, updateConstructorList(payload))).toEqual(payload)
    });

    test('should handle remove ingredient from list', () => {
        const initialState: ConstructorElementArrayType = [BurgerConstructorItem]

        expect(burgerConstructorReducer(initialState, removeComponent({dragId}))).toEqual([])
    });

    test('should handle make empty list', () => {
        const initialState: ConstructorElementArrayType = [BurgerConstructorItem]

        expect(burgerConstructorReducer(initialState, clearConstructor())).toEqual([])
    });
});
