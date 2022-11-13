import { ORDERS_URL } from '../constants/url-list';
import { request } from '../utils/request';

const sendOrder = (ingredients) => {
  const ids = ingredients.map(({ _id }) => _id);

  return request(ORDERS_URL, {
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
