import {WS_FEED_CONNECTION_SUCCESS,
    WS_FEED_CONNECTION_CLOSED,
    WS_FEED_CONNECTION_ERROR,
    WS_FEED_GET_MESSAGE
} from "../actions/feed";


import type { TFeedActions } from '../actions/feed';
import {IOrder} from "../types/data";

export interface IFeedInitialState {
    wsConnected: boolean
    total: number
    totalToday: number
    orders: IOrder[]
}

const initialState: IFeedInitialState = {
    wsConnected: false,
    total: 0,
    totalToday: 0,
    orders: []
};

export const feedReducer = (state = initialState, action: TFeedActions): IFeedInitialState => {
    switch (action.type) {
        case WS_FEED_CONNECTION_SUCCESS:
            return {
                ...state,
                wsConnected: true
            };

        case WS_FEED_CONNECTION_ERROR:
            return {
                ...state,
                wsConnected: false
            };

        case WS_FEED_CONNECTION_CLOSED:
            return {
                ...state,
                orders: [],
                total: 0,
                totalToday: 0,
                wsConnected: false
            };

        case WS_FEED_GET_MESSAGE:
            const orders = action.payload.orders.filter((order) => {
                const findIndex = state.orders.findIndex((ord) => order._id === ord._id);
                return findIndex === -1;
            });
            return {
                ...state,
                orders: [...state.orders, ...orders],
                total: action.payload.total,
                totalToday: action.payload.totalToday
            };
        default:
            return state;
    }
};
