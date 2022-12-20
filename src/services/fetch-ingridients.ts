import { INGREDIENTS_URL } from '../constants/url-list';
import {requestWithCheckResponse} from "../utils/request-with-check-response";
import {IIngredientsResponse} from "./types/data";


const fetchIngredients = () => {
  return requestWithCheckResponse<IIngredientsResponse>(INGREDIENTS_URL, {});
};

export default fetchIngredients;
