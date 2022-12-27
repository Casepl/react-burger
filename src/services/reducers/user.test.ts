import { userReducer, IUserInitialState } from './user';
import { userRequest,
    userSuccess,
    userFail,
    userPatchRequest,
    userPatchSuccess,
    userPatchFail } from '../actions/user';

const initialState: IUserInitialState = {
    userRequest: false,
    userRequestFailed: false,
    errorMessage: '',
    userPatchRequest: false,
    userPatchFailed: false,
    errorUserPatchMessage: '',
    patchUserMessage: ''
}
describe('Check user reducer', () =>{
    test('should return the initial state', () => {
        expect(userReducer(undefined, { type: undefined })).toEqual(initialState)
    });

    test('should go to request state', () => {
        expect(userReducer(initialState, userRequest())).toEqual({
            ...initialState,
            userRequest: true
        });
    });

    test('should return init state for get user', () => {
        expect(userReducer(initialState, userSuccess())).toEqual(initialState);
    });

    test('should go to user get error state', () => {
        expect(userReducer(initialState, userFail('test'))).toEqual({
            ...initialState,
            userRequestFailed: true,
            errorMessage: 'test'
        });
    });


    test('should go to request patch user state', () => {
        expect(userReducer(initialState, userPatchRequest())).toEqual({
            ...initialState,
            userPatchRequest: true
        });
    });

    test('should go to init patch success', () => {
        expect(userReducer(initialState, userPatchSuccess())).toEqual(initialState);
    });

    test('should go to path user error state', () => {
        expect(userReducer(initialState, userPatchFail('test'))).toEqual({
            ...initialState,
            userPatchFailed: true,
            errorUserPatchMessage: 'test'
        });
    });
});
