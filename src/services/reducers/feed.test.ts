import {feedReducer, IFeedInitialState} from './feed';
import {
    wsFeedConnectionClosed,
    wsFeedConnectionError,
    wsFeedConnectionSuccess,
    wsFeedGetMessage
} from '../actions/feed';
import {feed} from "./__fixtures__/feed";

const initialStateDefault = {
    wsConnected: false,
    total: 0,
    totalToday: 0,
    orders: []
}
describe('Check feed reducer', () =>{
    test('should return the initial state', () => {
        expect(feedReducer(undefined, { type: undefined! })).toEqual(initialStateDefault)
    });

    test('should handle set wsConnected is true', () => {
        const initialState: IFeedInitialState = initialStateDefault

        expect(feedReducer(initialState, wsFeedConnectionSuccess())).toEqual({...initialStateDefault,
            ...{wsConnected: true}})
    });

    test('should handle set wsConnected is false', () => {
        const initialState: IFeedInitialState = initialStateDefault

        expect(feedReducer(initialState, wsFeedConnectionError())).toEqual({...initialStateDefault,
            ...{wsConnected: false}})
    });

    test('should handle return to initial state', () => {
        const initialState: IFeedInitialState = initialStateDefault

        expect(feedReducer(initialState, wsFeedConnectionClosed())).toEqual(initialStateDefault)
    });

    test('should handle add message to empty list', () => {
        const initialState: IFeedInitialState = initialStateDefault
        expect(feedReducer(initialState, wsFeedGetMessage(feed))).toEqual({
            ...initialStateDefault,
            ...feed
        })
    });
});
