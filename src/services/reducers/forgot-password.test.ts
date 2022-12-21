import {forgotPasswordReducer, IForgotPassword} from './forgot-password';
import { request, success, error } from '../actions/forgot-password';

const initialStateDefault: IForgotPassword = {
    forgotPasswordFailed: false,
    message: '',
    errorMessage: '',
    isPasswordReset: false,
    forgotPasswordRequest: false
}
describe('Check forgot-password reducer', () =>{
    test('should return the initial state', () => {
        expect(forgotPasswordReducer(undefined, { type: undefined })).toEqual(initialStateDefault)
    });

    test('should init request state', () => {
        expect(forgotPasswordReducer(initialStateDefault, request())).toEqual({
            ...initialStateDefault,
            forgotPasswordRequest: true
        })
    });

    test('should set message', () => {
        expect(forgotPasswordReducer(initialStateDefault, success('test'))).toEqual({
            ...initialStateDefault,
            forgotPasswordFailed: false,
            message: 'test', forgotPasswordRequest: false, errorMessage: '', isPasswordReset: true
        })
    });

    test('should handle error state', () => {
        expect(forgotPasswordReducer(initialStateDefault, error('test'))).toEqual({
            ...initialStateDefault,
            forgotPasswordFailed: true,
            errorMessage: 'test', message: '', forgotPasswordRequest: false, isPasswordReset: false
        })
    });
});
