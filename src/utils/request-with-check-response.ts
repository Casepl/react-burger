import checkResponse from "./check-response";
import {IRequest, TResponseBody} from "../services/types/request";
import {request} from "./request";

const requestWithCheckResponse = async <T>(url: string, options: IRequest): Promise<TResponseBody<T>> => {
  return request(url, options).then(checkResponse)
}

export { requestWithCheckResponse }
