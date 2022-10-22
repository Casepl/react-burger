import { useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';
import cx from 'classnames';
import { useDispatch } from 'react-redux';
import { clearError as clearOrderError } from '../../services/actions/order';
import { clearError as clearIngridientsError } from '../../services/actions/ingridients';
import AppHeader from '../app-header/app-header';
import BurgerIngredients
  from '../burger-ingredients/burger-ingredients';
import BurgerConstructor
  from '../burger-constructor/burger-constructor';
import ErrorModal from '../error-modal/error-modal';
import styles from './app.module.css';




function App() {
  const dispatch = useDispatch();

  const ingredientsFailed = useSelector((store) =>
    store.ingredients.ingredientsFailed);

  const orderFailed = useSelector((store) =>
    store.order.orderFailed);

  const error = orderFailed && ingredientsFailed;

  const handleCloseErrorModal = () => {
    if(ingredientsFailed) {
      dispatch(clearIngridientsError());
    } else if (orderFailed) {
      dispatch(clearOrderError());
    }
  }

  return (
      <div className={styles.root}>
        <AppHeader/>
        <main className={cx(styles['content-root'])}>
          <section className={styles['content-container']}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients/>
              <BurgerConstructor/>
            </DndProvider>
          </section>
        </main>
        {error &&
          (<ErrorModal onClose={handleCloseErrorModal}>
            Что то пошло не так
          </ErrorModal>)
        }
      </div>
  );
}

export default App;
