import checkResponse from '../utils/check-response';
import { getCookie } from '../utils/cookie';
import {
  FORGOT_PASSWORD_URL,
  LOGIN_URL,
  REGISTRATION_URL,
  RESET_PASSWORD_URL,
  REFRESH_TOKEN_URL, USER_URL, LOGOUT_URL
} from '../constants/url-list';

const forgotPasswordApi = (email) => {
  return fetch(FORGOT_PASSWORD_URL, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
    'Content-Type': 'application/json'
  },
    redirect: 'follow',
      referrerPolicy: 'no-referrer',
    body: JSON.stringify({email})
  })
    .then(checkResponse);
}

const loginApi= async form => {
  return await fetch(LOGIN_URL, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form)
  }).then(checkResponse);
};

const loginOutApi= async data => {
  return await fetch(LOGOUT_URL, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  }).then(checkResponse);
};

const resetPasswordApi= async data => {
  return await fetch(RESET_PASSWORD_URL, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  }).then(checkResponse);
};

const registrationApi= async form => {
  return await fetch(REGISTRATION_URL, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form)
  }).then(checkResponse);
};


const getUserApi= () => {
  return fetch(USER_URL, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      authorization: getCookie('accessToken')
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  });
};

const patchUserApi = (form) => {
  return fetch(USER_URL, {
    method: 'PATCH',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      authorization: getCookie('accessToken')
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form)
  });
};


const refreshTokenRequest= async (data) => {
  return await fetch(REFRESH_TOKEN_URL, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  });
};


export { forgotPasswordApi,
  loginApi, getUserApi, registrationApi, resetPasswordApi,
  refreshTokenRequest, loginOutApi, patchUserApi };
