import { setCookie, deleteCookie } from './cookie';



export const saveTokens = (refreshToken: string, accessToken: string) => {
  setCookie('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
}

export const deleteTokens = () => {
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
}
