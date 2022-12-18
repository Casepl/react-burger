import {Feed} from "../types/data";

export const WS_FEED_CONNECTION_START: 'WS_FEED_CONNECTION_START' = 'WS_FEED_CONNECTION_START';
export const WS_FEED_CONNECTION_SUCCESS:  'WS_FEED_CONNECTION_SUCCESS' = 'WS_FEED_CONNECTION_SUCCESS';
export const WS_FEED_CONNECTION_ERROR: 'WS_FEED_CONNECTION_ERROR' = 'WS_FEED_CONNECTION_ERROR';
export const WS_FEED_CONNECTION_CLOSED:  'WS_FEED_CONNECTION_CLOSED'= 'WS_FEED_CONNECTION_CLOSED';
export const WS_FEED_GET_MESSAGE: 'WS_FEED_GET_MESSAGE' = 'WS_FEED_GET_MESSAGE';
export const WS_FEED_CLOSE_SOCKET: 'WS_FEED_CLOSE_SOCKET' = 'WS_FEED_CLOSE_SOCKET'


export interface IWsFeedConnectionSuccess {
    readonly type: typeof WS_FEED_CONNECTION_SUCCESS;
}

export interface IWsFeedConnectionError {
    readonly type: typeof WS_FEED_CONNECTION_ERROR;
}

export interface IWsFeedConnectionClosed {
    readonly type: typeof WS_FEED_CONNECTION_CLOSED;
}


export interface IWsFeedCloseSocket {
    readonly type: typeof WS_FEED_CLOSE_SOCKET;
}

export type TFeedActions =
    | IWsFeedConnectionSuccess
    | IWsFeedConnectionError
    | IWsFeedConnectionClosed | IWsFeedGetMessage | IWsFeedCloseSocket;

export interface IWsFeedGetMessage {
    readonly type: typeof WS_FEED_GET_MESSAGE;
    readonly payload: Feed;
}
export const wsFeedConnectionSuccess = (): IWsFeedConnectionSuccess => {
    return {
        type: WS_FEED_CONNECTION_SUCCESS
    };
};

export const wsFeedCloseSocket = (): IWsFeedCloseSocket => {
    return {
        type: WS_FEED_CLOSE_SOCKET
    };
};

export const wsFeedConnectionError = (): IWsFeedConnectionError => {
    return {
        type: WS_FEED_CONNECTION_ERROR
    };
};

export const wsFeedConnectionClosed = (): IWsFeedConnectionClosed => {
    return {
        type: WS_FEED_CONNECTION_CLOSED
    };
};

export const wsFeedGetMessage = (message: Feed): IWsFeedGetMessage => {
    return {
        type: WS_FEED_GET_MESSAGE,
        payload: message
    };
};
