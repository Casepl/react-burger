import { defaultFetchFields } from '../constants/defaultFetchFields';
import { getCookie } from './cookie';
import checkResponse from './check-response';

const request = (url, {
  method = 'GET',
  body,
  withAuth = false,
  withCheckResponse = false,
  fetchInitOptions = {}
} = {}) => {

  let options = {
    ...defaultFetchFields,
    ...(method && { method }),
    ...(body && { body }),
    ...(withAuth && {
      headers: {
        ...(fetchInitOptions?.headers && {...fetchInitOptions.headers}),
        ...defaultFetchFields.headers, ...{
          authorization: getCookie('accessToken')
        }
      }
    })
  };

  if(fetchInitOptions){
    delete fetchInitOptions.headers;

    options= { ...options, fetchInitOptions}
  }

  let fetchRequest = fetch(url, options);

  if (withCheckResponse) {
    fetchRequest = fetchRequest.then(checkResponse);
  }

  return fetchRequest;
};

export { request };
