import {Feed} from "../types/data";

export const WS_ORDERS_CONNECTION_START = 'WS_ORDERS_CONNECTION_START';
export const WS_ORDERS_CONNECTION_SUCCESS = 'WS_ORDERS_CONNECTION_SUCCESS';
export const WS_ORDERS_CONNECTION_ERROR = 'WS_ORDERS_CONNECTION_ERROR';
export const WS_ORDERS_CONNECTION_CLOSED = 'WS_ORDERS_CONNECTION_CLOSED';
export const WS_ORDERS_GET_MESSAGE = 'WS_ORDERS_GET_MESSAGE';

export const WS_ORDERS_CLOSE_SOCKET = 'WS_ORDERS_CLOSE_SOCKET';

export interface IWsOrdersConnectionSuccess {
    readonly type: typeof WS_ORDERS_CONNECTION_SUCCESS;
}

export interface IWsOrdersConnectionError {
    readonly type: typeof WS_ORDERS_CONNECTION_ERROR;
}

export interface IWsOrdersConnectionClosed {
    readonly type: typeof WS_ORDERS_CONNECTION_CLOSED;
}


export interface IWsOrdersCloseSocket {
    readonly type: typeof WS_ORDERS_CLOSE_SOCKET;
}

export interface IWsOrdersGetMessage {
    readonly type: typeof WS_ORDERS_GET_MESSAGE;
    readonly payload: Feed;
}

export type TOrdersActions =
    | IWsOrdersConnectionSuccess
    | IWsOrdersConnectionError
    | IWsOrdersConnectionClosed | IWsOrdersGetMessage | IWsOrdersCloseSocket;


export const wsFeedConnectionSuccess = (): IWsOrdersConnectionSuccess => {
    return {
        type: WS_ORDERS_CONNECTION_SUCCESS
    };
};

export const wsFeedCloseSocket = (): IWsOrdersCloseSocket => {
    return {
        type: WS_ORDERS_CLOSE_SOCKET
    };
};

export const wsFeedConnectionError = (): IWsOrdersConnectionError => {
    return {
        type: WS_ORDERS_CONNECTION_ERROR
    };
};

export const wsFeedConnectionClosed = (): IWsOrdersConnectionClosed => {
    return {
        type: WS_ORDERS_CONNECTION_CLOSED
    };
};

export const wsOrdersGetMessage = (message: Feed): IWsOrdersGetMessage => {
    return {
        type: WS_ORDERS_GET_MESSAGE,
        payload: message
    };
};

