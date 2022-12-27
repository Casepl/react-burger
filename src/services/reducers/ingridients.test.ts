import { ingredientsReducer, IIngredientsState } from './ingridients';
import { request, success, error, clearError } from '../actions/ingridients';
import { ingredient } from './__fixtures__/ingridients';

const initialState: IIngredientsState = {
    ingredientsFailed: false,
    ingredients: [],
    ingredientsRequest: false
}
describe('Check ingredient reducer', () =>{
    test('should return the initial state', () => {
        expect(ingredientsReducer(undefined, { type: undefined })).toEqual(initialState)
    });

    test('should set request state', () => {
        expect(ingredientsReducer(initialState, request())).toEqual({
            ...initialState,
            ingredientsRequest: true
        })
    });

    test('should set ingredients list', () => {
        const ingredients = [
            ingredient,
            ingredient
        ];
        expect(ingredientsReducer(initialState, success({items: ingredients }))).toEqual({
            ...initialState,
            ingredients
        })
    });

    test('should set error state', () => {
        expect(ingredientsReducer(initialState, error())).toEqual({
            ...initialState,
            ingredientsFailed: true
        })
    });

    test('should reset error state', () => {
        expect(ingredientsReducer(initialState, clearError())).toEqual({
            ...initialState
        })
    });
});
