import {
  BrowserRouter as Router
} from 'react-router-dom';
import { useSelector} from "../../hooks/useSelector";
import { useDispatch } from "../../hooks/useDispatch";
import {
  clearError as clearOrderError
} from '../../services/actions/order';
import {
  clearError as clearIngridientsError, getIngredients
} from '../../services/actions/ingridients';
import { clearLogoutError } from '../../services/actions/logout';
import ErrorModal from '../error-modal/error-modal';
import styles from './app.module.css';
import ModalRoutes from '../modal-routes/modal-routes';
import { useEffect } from 'react';
import { getUser } from '../../services/actions/user';

function App() {
  const dispatch = useDispatch();

  const ingredientsFailed = useSelector((store) =>
    store.ingredients.ingredientsFailed);

  const orderFailed = useSelector((store) =>
    store.order.orderFailed);

  const logoutFail = useSelector((store) => {
    return store.logout.logoutRequestFailed;
  });

  const error = orderFailed || ingredientsFailed || logoutFail;

  const handleCloseErrorModal = () => {
    if (ingredientsFailed) {
      dispatch(clearIngridientsError());
    } else if (orderFailed) {
      dispatch(clearOrderError());
    } else if (logoutFail) {
      dispatch(clearLogoutError());
    }
  };

  useEffect(() => {
    dispatch(getUser());
    dispatch(getIngredients());
  }, [dispatch])


  return (
    <div className={styles.root}>
      <Router>
        <ModalRoutes />
      </Router>
      {error &&
        (<ErrorModal onClose={handleCloseErrorModal}>
          Что то пошло не так
        </ErrorModal>)
      }
    </div>
  );
}

export default App;
