import { defaultFetchFields } from '../constants/defaultFetchFields';
import { getCookie } from './cookie';

import type {CustomResponse, IRequest } from '../services/types/request';

const request = async <T>(url: string, {
  method = 'GET',
  body,
  withAuth = false,
  fetchInitOptions = {}
}: IRequest): Promise<CustomResponse<T>> => {
  let options = {
    ...defaultFetchFields,
    ...(method && { method }),
     body,
    ...(fetchInitOptions?.headers && {
      headers: {
        ...fetchInitOptions.headers
      }
    }),
    ...(withAuth && {
      headers: {
        ...defaultFetchFields.headers, ...{
          authorization: getCookie('accessToken')
        }
      }
    })
  };

  if (fetchInitOptions) {
    delete fetchInitOptions.headers;

    options = {
      ...options,
      ...fetchInitOptions
    };
  }

  return fetch(url, options as RequestInit);
};

export { request };
