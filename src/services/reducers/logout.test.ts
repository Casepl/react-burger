import { logoutReducer, ILogoutInitialState } from './logout';
import { logoutRequest, logoutSuccess, logoutFail, clearLogoutError } from '../actions/logout';

const initialState: ILogoutInitialState = {
    logoutRequest: false,
    logoutRequestFailed: false,
    errorMessage: ''
}
describe('Check logout reducer', () =>{
    test('should return the initial state', () => {
        expect(logoutReducer(undefined, { type: undefined })).toEqual(initialState)
    });

    test('should set request state', () => {
        expect(logoutReducer(initialState, logoutRequest())).toEqual({
            ...initialState,
            logoutRequest: true
        })
    });

    test('should return init state', () => {

        expect(logoutReducer(initialState, logoutSuccess())).toEqual({
            ...initialState
        });
    });

    test('should go to error state', () => {

        expect(logoutReducer(initialState, logoutFail('test'))).toEqual({
            ...initialState,
            logoutRequestFailed: true,
            errorMessage: 'test'
        });
    });

    test('should return init state with clear error action', () => {

        expect(logoutReducer(initialState, clearLogoutError())).toEqual({
            ...initialState,
        });
    });
});
