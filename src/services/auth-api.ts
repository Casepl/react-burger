import {
  FORGOT_PASSWORD_URL,
  LOGIN_URL,
  REGISTRATION_URL,
  RESET_PASSWORD_URL,
  REFRESH_TOKEN_URL, USER_URL, LOGOUT_URL
} from '../constants/url-list';
import { request } from '../utils/request';
import {requestWithCheckResponse} from "../utils/request-with-check-response";
import {ILoginResponse, IRegistrationResponse, IResponseUser, ITokenResponse} from "./types/data";

const forgotPasswordApi = (email: string) => {
  return requestWithCheckResponse(FORGOT_PASSWORD_URL,
    {
      method: 'POST',
      body: JSON.stringify({ email })
    });
};

const loginApi = async (form: { email: string, password: string}) => {
  return await requestWithCheckResponse<ILoginResponse>(LOGIN_URL,
    {
      method: 'POST',
      body: JSON.stringify(form)
    });
};

const loginOutApi = async (data: { refreshToken: string | null}) => {
  return await requestWithCheckResponse(LOGOUT_URL,
    {
      method: 'POST',
      withAuth: true,
      body: JSON.stringify({token: data.refreshToken})
    });
};

const resetPasswordApi = async (data: {token: string,
    password: string}) => {
  return await requestWithCheckResponse(RESET_PASSWORD_URL,
    {
      method: 'POST',
      body: JSON.stringify(data)
    });
};

const registrationApi = async (form: {
    name: string,
    email: string,
    password: string
}) => {
  return await requestWithCheckResponse<IRegistrationResponse>(REGISTRATION_URL,
    {
      method: 'POST',
      body: JSON.stringify(form)
    });
};

const getUserApi = () => {
  return request<IResponseUser>(USER_URL, { withAuth: true });
};

const patchUserApi = (form: {email?: string, name?: string, password?: string}) => {
  return request<IResponseUser>(USER_URL,
    {
      withAuth: true,
      method: 'PATCH',
      body: JSON.stringify(form)
    });
};

const refreshTokenRequest = async (data: {token: string | null}) => {
  return await request<ITokenResponse>(REFRESH_TOKEN_URL, {
    method: 'POST',
    body: JSON.stringify(data)
  });
};

export {
  forgotPasswordApi,
  loginApi, getUserApi, registrationApi, resetPasswordApi,
  refreshTokenRequest, loginOutApi, patchUserApi
};
