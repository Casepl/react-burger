import {composeWithDevTools} from "redux-devtools-extension";
import {applyMiddleware, createStore} from "redux";
import { socketMiddleware } from '../middleware';
import thunk from "redux-thunk";
import {wsFeedActions, wsOrdersActions} from "../constants/socketActions";
import {rootReducer} from "./reducers";



const enhancer = composeWithDevTools(applyMiddleware(thunk,
    socketMiddleware(wsFeedActions),
    socketMiddleware(wsOrdersActions)));

export const store = createStore(rootReducer, enhancer);
