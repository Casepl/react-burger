import { createAction } from '@reduxjs/toolkit';
import { refreshTokenRequest } from '../auth-api';
import { saveTokens } from '../../utils/token';
import {AppDispatch, AppThunk} from "../types";
import {IUser} from "../types/data";
import {AnyAction} from "redux";


export const setUser = createAction<IUser | null, 'auth/setUser'>('auth/setUser');

export const refreshToken= (afterRefresh: AppThunk, fail: AnyAction):AppThunk => (dispatch: AppDispatch) => {
  const token = localStorage.getItem('refreshToken');
  refreshTokenRequest({ token })
    .then((res) => {
        res.json().then((json)=>{
            saveTokens(json.refreshToken, json.accessToken);
            dispatch(afterRefresh);
        });
    }).catch(()=> {
      dispatch(fail);
    });
};



