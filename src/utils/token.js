import { setCookie, deleteCookie } from './cookie';



export const saveTokens = (refreshToken, accessToken) => {
  setCookie('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
}

export const deleteTokens = () => {
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
}
