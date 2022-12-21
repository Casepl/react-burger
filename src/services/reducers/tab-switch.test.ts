import { tabSwitchReducer } from './tab-switch';
import { tabSwitch } from '../actions/tab-switch';

const initialState: string = '';
describe('Check logout reducer', () =>{
    test('should return the initial state', () => {
        expect(tabSwitchReducer(undefined, { type: undefined })).toEqual('bun')
    });

    test('should set request state', () => {
        expect(tabSwitchReducer(initialState, tabSwitch('test'))).toEqual('test')
    });
});
