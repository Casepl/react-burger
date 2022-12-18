import {WS_ORDERS_CONNECTION_SUCCESS,
    WS_ORDERS_CONNECTION_CLOSED,
    WS_ORDERS_CONNECTION_ERROR,
    WS_ORDERS_GET_MESSAGE
} from "../actions/orders";


import type { TOrdersActions } from '../actions/orders';
import {IOrder} from "../types/data";

interface IOrdersInitialState {
    wsConnected: boolean
    total: number
    totalToday: number
    orders: IOrder[]
}

const initialState: IOrdersInitialState = {
    wsConnected: false,
    total: 0,
    totalToday: 0,
    orders: []
};

export const profileOrdersReducer = (state = initialState, action: TOrdersActions): IOrdersInitialState => {
    switch (action.type) {
        case WS_ORDERS_CONNECTION_SUCCESS:
            return {
                ...state,
                wsConnected: true
            };

        case WS_ORDERS_CONNECTION_ERROR:
            return {
                ...state,
                wsConnected: false
            };

        case WS_ORDERS_CONNECTION_CLOSED:
            return {
                ...state,
                orders: [],
                total: 0,
                totalToday: 0,
                wsConnected: false
            };

        case WS_ORDERS_GET_MESSAGE:
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
