import { registrationReducer, IRegistrationState } from './registration';
import { registrationRequest, registrationSuccess, registrationFail } from '../actions/registration';

const initialState: IRegistrationState = {
    registrationRequest: false,
    registrationFailed: false,
    errorMessage: ''
}
describe('Check registration reducer', () => {
    test('should return the initial state', () => {
        expect(registrationReducer(undefined, { type: undefined })).toEqual(initialState)
    });

    test('should set request state', () => {
        expect(registrationReducer(initialState, registrationRequest())).toEqual({
            ...initialState,
            registrationRequest: true
        })
    });

    test('should return init state', () => {
        expect(registrationReducer(initialState, registrationSuccess())).toEqual(initialState);
    });

    test('should go to error state', () => {

        expect(registrationReducer(initialState, registrationFail('test'))).toEqual({
            ...initialState,
            registrationFailed: true,
            errorMessage: 'test'
        });
    });
});
