import { authReducer } from './auth';
import { setUser } from '../actions/auth';


describe('Check auth reducer', () =>{
    test('should return the initial state', () => {
        expect(authReducer(undefined, { type: undefined })).toEqual({
            user: null
        })
    });

    test('should handle setUser', () => {
        const user = {
            email: 'test@tests.ru',
            name: 'test'
        }
        expect(authReducer(undefined, setUser(user))).toEqual({
            user
        })
    });
});
