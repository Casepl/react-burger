import { createAction } from '@reduxjs/toolkit';
import { getUserApi, patchUserApi } from '../auth-api';
import { refreshToken, setUser } from './auth';
import checkAuthResponse from '../../utils/check-auth-response';

export const userRequest = createAction('user/get-request');
export const userSuccess = createAction('user/get-success');
export const userFail = createAction('user/get-fail');

export const userPatchRequest = createAction('user/patch-request');
export const userPatchSuccess = createAction('user/path-success');
export const userPatchFail = createAction('user/patch-fail');


export function getUser() {
  return function (dispatch) {
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
          dispatch(refreshToken(getUser()));
        } else {
          dispatch(userFail(error.message));
        }
      });
  };
}


export function patchUser(form) {
  return function (dispatch) {
    dispatch(userPatchRequest());
    patchUserApi(form)
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
          dispatch(refreshToken(getUser()));
        } else {
          dispatch(userPatchFail(error.message));
        }
      });
  };
}


