import { loginReducer, ILoginInitialState } from './login';
import { loginRequest, loginSuccess, loginFail } from '../actions/login';

const initialState: ILoginInitialState = {
    loginRequest: false,
    loginRequestFailed: false,
    errorMessage: ''
}
describe('Check login reducer', () =>{
    test('should return the initial state', () => {
        expect(loginReducer(undefined, { type: undefined })).toEqual(initialState)
    });

    test('should set request state', () => {
        expect(loginReducer(initialState, loginRequest())).toEqual({
            ...initialState,
            loginRequest: true
        })
    });

    test('should return init state', () => {
        const testInitialState: ILoginInitialState = {
            ...initialState,
            loginRequest: true
        }

        expect(loginReducer(testInitialState, loginSuccess())).toEqual({
            ...initialState
        });
    });

    test('should go to error state', () => {

        expect(loginReducer(initialState, loginFail('test'))).toEqual({
            ...initialState,
            loginRequestFailed: true,
            errorMessage: 'test'
        });
    });
});
