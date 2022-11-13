import {
  FORGOT_PASSWORD_URL,
  LOGIN_URL,
  REGISTRATION_URL,
  RESET_PASSWORD_URL,
  REFRESH_TOKEN_URL, USER_URL, LOGOUT_URL
} from '../constants/url-list';
import { request } from '../utils/request';

const forgotPasswordApi = (email) => {
  return request(FORGOT_PASSWORD_URL,
    {
      withCheckResponse: true,
      method: 'POST',
      body: JSON.stringify({ email })
    });
};

const loginApi = async form => {
  return await request(LOGIN_URL,
    {
      withCheckResponse: true,
      method: 'POST',
      body: JSON.stringify(form)
    });
};

const loginOutApi = async data => {
  return await request(LOGOUT_URL,
    {
      withCheckResponse: true,
      method: 'POST',
      body: JSON.stringify(data)
    });
};

const resetPasswordApi = async data => {
  return await request(RESET_PASSWORD_URL,
    {
      withCheckResponse: true,
      method: 'POST',
      body: JSON.stringify(data)
    });
};

const registrationApi = async form => {
  return await request(REGISTRATION_URL,
    {
      withCheckResponse: true,
      method: 'POST',
      body: JSON.stringify(form)
    });
};

const getUserApi = () => {
  return request(USER_URL, { withAuth: true });
};

const patchUserApi = (form) => {
  return request(USER_URL,
    {
      withAuth: true,
      method: 'PATCH',
      body: JSON.stringify(form)
    });
};

const refreshTokenRequest = async (data) => {
  return await fetch(REFRESH_TOKEN_URL, {
    method: 'POST',
    body: JSON.stringify(data)
  });
};

export {
  forgotPasswordApi,
  loginApi, getUserApi, registrationApi, resetPasswordApi,
  refreshTokenRequest, loginOutApi, patchUserApi
};
