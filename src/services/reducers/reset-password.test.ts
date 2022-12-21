import { resetPasswordReducer, IResetPasswordState } from './reset-password';
import { request, success, error } from '../actions/reset-password';

const initialState: IResetPasswordState = {
    resetPasswordFailed: false,
    message: '',
    errorMessage: '',
    isPasswordResetSuccess: false,
    resetPasswordRequest: false
}
describe('Check reset password reducer', () => {
    test('should return the initial state', () => {
        expect(resetPasswordReducer(undefined, { type: undefined })).toEqual(initialState)
    });

    test('should set request state', () => {
        expect(resetPasswordReducer(initialState, request())).toEqual({
            ...initialState,
            resetPasswordRequest: true
        })
    });

    test('should return set success message and go to success state', () => {
        expect(resetPasswordReducer(initialState, success('test'))).toEqual({
            ...initialState,
            message: 'test',
            isPasswordResetSuccess: true
        });
    });

    test('should go to error state', () => {
        expect(resetPasswordReducer(initialState, error('test'))).toEqual({
            ...initialState,
            resetPasswordFailed: true,
            errorMessage: 'test'
        });
    });
});
