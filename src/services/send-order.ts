import { ORDERS_URL } from '../constants/url-list';
import { ingredientsArrayType } from "../constants/burgers-prop-type";
import {IOrderResponse} from "./types/data";
import {requestWithCheckResponse} from "../utils/request-with-check-response";

const sendOrder = (ingredients: ingredientsArrayType) => {
  const ids = ingredients.map(({ _id }) => _id);

  return requestWithCheckResponse<IOrderResponse>(ORDERS_URL, {
    method: 'POST',
    body: JSON.stringify({ ingredients: ids }),
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
