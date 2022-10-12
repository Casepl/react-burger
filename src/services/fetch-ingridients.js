import checkResponse from '../utils/check-response';
import { INGREDIENTS_URL } from '../constants/url-list';

const fetchIngredients = () => {
  return fetch(INGREDIENTS_URL)
    .then(checkResponse);
}

export default fetchIngredients;
