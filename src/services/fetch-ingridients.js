import { INGREDIENTS_URL } from '../constants/url-list';
import { request } from '../utils/request';

const fetchIngredients = () => {
  return request(INGREDIENTS_URL, { withCheckResponse: true });
};

export default fetchIngredients;
