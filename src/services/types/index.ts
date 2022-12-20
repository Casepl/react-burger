import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { store } from '../store';
import { AnyAction } from "redux";
import { wsOrdersActions, wsFeedActions } from "../../constants/socketActions";


export type TSocketConstantActions = typeof wsOrdersActions | typeof wsFeedActions;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    AnyAction
>
