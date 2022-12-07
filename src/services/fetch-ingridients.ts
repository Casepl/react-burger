import { INGREDIENTS_URL } from '../constants/url-list';
import {requestWithCheckResponse} from "../utils/request-with-check-response";

const fetchIngredients = () => {
  return requestWithCheckResponse(INGREDIENTS_URL, {});
};

export default fetchIngredients;
