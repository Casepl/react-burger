import {
  useCallback,
  useContext,
  useMemo,
  useState,
  useReducer
} from 'react';
import cx from 'classnames';
import sendOrder from '../../services/send-order';
import {
  ConstructorElement,
  DragIcon,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import Bun from '../bun/bun';
import TotalPrice from '../total-price/total-price';
import {
  BurgerIngridientsContext,
  ErrorContext
} from '../../services/app-context';
import styles from './burger-constructor.module.css';

const initialState = { totalPrice: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'setTotalPrice':
      return { totalPrice: action.payload };
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

const BurgerConstructor = () => {
  const ingredients = useContext(BurgerIngridientsContext);
  const { setError } = useContext(ErrorContext);
  const [isShowOrderDetails, setShowOrderDetails] = useState(false);
  const [orderId, setOrderId] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  const elements = useMemo(() => {
    if (!ingredients || !ingredients.length) {
      return {};
    }

    const bun = ingredients.find((el) => el.type === 'bun');
    const constructorElements = ingredients.filter((el) => el.type !== 'bun');

    const constructorElementsSum = constructorElements.reduce((acc, element) => {
      return acc + element.price;
    }, 0);

    dispatch({
      type: 'setTotalPrice',
      payload: bun.price * 2 + constructorElementsSum
    });

    return {
      bun,
      constructorElements
    };
  }, [ingredients]);

  const handleOrderClick = useCallback(() => {
    setIsLoading(true);

    sendOrder([elements.bun,
      ...elements.constructorElements, elements.bun])
      .then((orderId) => {
        setOrderId(orderId);
        setShowOrderDetails(true);
      })
      .catch((e) => {
        setError(typeof e === 'string' ? e : e.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [elements.bun, elements.constructorElements, setError]);

  const handleCloseOrderDetails = useCallback(() => {
    setShowOrderDetails(false);
  }, []);

  return (
    <div className={cx('pt-25 pl-4 pr-4')}>
      <div className={cx(styles['constructor-wrapper'], 'mb-10')}>
        {elements.bun && (<Bun bun={elements.bun} type="top"/>)}
        <div
          className={cx(styles.list, styles['constructor-container'], 'custom-scroll')}>
          {elements?.constructorElements && elements.constructorElements.map((item) => {
            return (
              <div key={item._id}
                   className={styles['constructor-element']}>
                <div className="mr-2">
                  <DragIcon type="primary"/>
                </div>
                <ConstructorElement
                  key={item._id}
                  type={item.type}
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image_mobile}
                />
              </div>
            );
          })}
        </div>
        {elements.bun && (<Bun bun={elements.bun} type="bottom"/>)}
      </div>
      <div className={styles['order-container']}>
        <TotalPrice total={state.totalPrice}/>
        <Button disabled={isLoading}
                type="primary"
                size="medium"
                htmlType="button"
                onClick={handleOrderClick}>
          Оформить заказ
        </Button>
      </div>
      {isShowOrderDetails && (
        <Modal onClose={handleCloseOrderDetails}>
          <OrderDetails orderId={orderId}/>
        </Modal>)
      }
    </div>
  );
};

export default BurgerConstructor;
