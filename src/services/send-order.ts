import { ORDERS_URL } from '../constants/url-list';
import {ConstructorElementArrayType} from "../constants/burgers-prop-type";
import {IOrderResponse} from "./types/data";
import {requestWithCheckResponse} from "../utils/request-with-check-response";

const sendOrder = (ingredients: ConstructorElementArrayType) => {
  const ids = ingredients.map(({ _id }) => _id);

  return requestWithCheckResponse<IOrderResponse>(ORDERS_URL, {
    method: 'POST',
    body: JSON.stringify({ ingredients: ids }),
    withAuth: true,
    withCheckResponse: true
  })
    .then((json) => {
        if (!json.success) {
        throw new Error('Не получается сделать заказ 🥹');
      }

       return json.order;
    });
};

export default sendOrder;
