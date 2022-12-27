import {profileOrdersReducer, IOrdersInitialState} from './orders';
import { wsFeedConnectionSuccess,
    wsFeedConnectionError,
    wsFeedConnectionClosed, wsOrdersGetMessage } from '../actions/orders';
import { orderResponse } from './__fixtures__/orders';

const initialState: IOrdersInitialState = {
    wsConnected: false,
    total: 0,
    totalToday: 0,
    orders: []
}
describe('Check profileorders reducer', () =>{
    test('should return the initial state', () => {
        expect(profileOrdersReducer(undefined, { type: undefined! })).toEqual(initialState)
    });

    test('should set request state', () => {
        expect(profileOrdersReducer(initialState, wsFeedConnectionSuccess())).toEqual({
            ...initialState,
            wsConnected: true
        })
    });

    test('should return to init state', () => {
        expect(profileOrdersReducer(initialState, wsFeedConnectionError())).toEqual({
            ...initialState,
            wsConnected: false
        })
    });

    test('should return to init state with closed action', () => {
        expect(profileOrdersReducer(initialState, wsFeedConnectionClosed())).toEqual(initialState)
    });

    test('should create list orders', () => {
        expect(profileOrdersReducer(initialState, wsOrdersGetMessage(orderResponse))).toEqual({
            ...initialState,
            ...orderResponse
        })
    });
});
