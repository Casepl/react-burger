import { ORDERS_URL } from '../constants/url-list';
import checkResponse from '../utils/check-response';

const sendOrder = (ingredients) => {
  const ids = ingredients.map(({ _id }) => _id);

  return fetch(ORDERS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ingredients: ids })
  })
    .then(checkResponse)
    .then((json) => {
      if (!json.success) {
        throw new Error('Не получается сделать заказ 🥹');
      }

      return json.order.number;
    });
};

export default sendOrder;
