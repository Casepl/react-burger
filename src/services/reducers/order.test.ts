import { orderReducer,  IOrderState} from './order';
import { request, success, error, clearError, clearOrder } from '../actions/order';

const initialState: IOrderState = {
    orderFailed: false,
    response: null,
    orderRequest: false
}
describe('Check order reducer', () =>{
    test('should return the initial state', () => {
        expect(orderReducer(undefined, { type: undefined })).toEqual(initialState)
    });

    test('should set request state', () => {
        expect(orderReducer(initialState, request())).toEqual({
            ...initialState,
            orderRequest: true
        })
    });

    test('should return init state', () => {

        expect(orderReducer(initialState, success({ number: 1}))).toEqual({
            ...initialState,
            response: { number: 1 }
        });
    });

    test('should go to error state', () => {
        expect(orderReducer(initialState, error())).toEqual({
            ...initialState,
            orderFailed: true
        });
    });

    test('should return init state with clear error action', () => {
        expect(orderReducer(initialState, clearError())).toEqual({
            ...initialState,
        });
    });

    test('should return init clear order action', () => {

        expect(orderReducer(initialState, clearOrder())).toEqual({
            ...initialState,
        });
    });
});
