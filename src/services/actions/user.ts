import {createAction } from '@reduxjs/toolkit';
import { getUserApi, patchUserApi } from '../auth-api';
import { refreshToken, setUser } from './auth';
import checkAuthResponse from '../../utils/check-auth-response';
import {AppDispatch, AppThunk} from "../types";
import {IUserPatchForm} from "../types/data";

export const userRequest = createAction('user/get-request');
export const userSuccess = createAction('user/get-success');
export const userFail = createAction<string, 'user/get-fail'>('user/get-fail');

export const userPatchRequest = createAction('user/patch-request');
export const userPatchSuccess = createAction('user/path-success');
export const userPatchFail = createAction<string, 'user/patch-fail'>('user/patch-fail');

export function getUser(): AppThunk {
  return function (dispatch: AppDispatch){
    dispatch(userRequest());
    getUserApi()
      .then(checkAuthResponse)
      .then((json)=>{
        if(json && json.success) {
          dispatch(setUser(json.user));
          dispatch(userSuccess());
        } else {
          dispatch(userFail(json.message));
        }
      })
      .catch((error)=>{
        if(error.message === 'jwt expired') {
          dispatch(refreshToken(getUser(), userFail('Упс, что то пошло не так')));
        } else {
          dispatch(userFail(error.message));
        }
      });
  };
}


export function patchUser(form: IUserPatchForm) {
  return function (dispatch: AppDispatch) {
    dispatch(userPatchRequest());
    patchUserApi(form)
      .then(checkAuthResponse)
      .then((json)=>{
          if(json && json.success) {
            dispatch(setUser(json.user));
            dispatch(userPatchSuccess());
          } else {
            dispatch(userPatchFail(json.message));
          }
      })
      .catch((error)=>{
        if(error.message === 'jwt expired') {
          dispatch(refreshToken(getUser(), userPatchFail('Упс, что то пошло не так')));
        } else {
          dispatch(userPatchFail(error.message));
        }
      });
  };
}


