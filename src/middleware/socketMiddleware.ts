import { TSocketConstantActions } from "../services/types";
import { Middleware } from "redux";

export const socketMiddleware = (wsActions: TSocketConstantActions): Middleware => {
    return (store) => {
        let socket: WebSocket;

        return (next) => (action) => {
            const { dispatch } = store;
            const { type, payload } = action;
            const { wsInit, onOpen, onClose, onError, onMessage, wsClose } = wsActions;

            if (type === wsInit) {
                socket = new WebSocket(payload);
            }

            if (socket) {
                socket.onopen = (event: Event) => {
                    dispatch({ type: onOpen, payload: event });
                };

                socket.onerror = (event: Event) => {
                    dispatch({ type: onError, payload: event });
                };

                socket.onmessage =(event: MessageEvent) => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    const { success, ...restParsedData } = parsedData;

                    dispatch({ type: onMessage, payload: restParsedData });
                };

                socket.onclose = (event: Event) => {
                    dispatch({ type: onClose, payload: event });
                };
                if(wsClose && type === wsClose) {
                    if (socket.readyState === 1) {
                        socket.close();
                    }
                }
            }

            next(action);
        };
    };
};
