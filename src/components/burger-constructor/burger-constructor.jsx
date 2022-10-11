import {
  useCallback,
  useContext,
  useMemo,
  useState,
  useReducer
} from 'react';
import cx from 'classnames';
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import {
  BurgerIngridientsContext,
  ErrorContext
} from '../../services/app-context';
import {
  ingredientType
} from '../../constants/burgers-prop-type';
import styles from './burger-constructor.module.css';
import PropTypes from 'prop-types';
import { OrdersURL } from '../../constants/url-list';
import checkResponse from '../../utils/checkResponse';

const DragIconWrapper = () => {
  return (
    <div className="mr-2">
      <DragIcon type="primary"/>
    </div>
  );
};

const Bun = (props) => {
  const {
    bun: {
      _id,
      name,
      price,
      image_mobile
    },
    type
  } = props;

  const bunName = useMemo(() => {
    return bunNameFormatter(name, type);
  }, [name, type]);

  return (
    <>
      {name && (
        <div className={cx(styles['constructor-element'], 'pl-8')}>
          <ConstructorElement
            key={_id}
            type={type}
            isLocked
            text={bunName}
            price={price}
            thumbnail={image_mobile}
          />
        </div>)}
    </>
  );
};

Bun.prototype = {
  bun: ingredientType.isRequired,
  type: PropTypes.string.isRequired
};

const Price = (props) => {
  const { total } = props;

  return (
    <div className={cx(styles['price-container'], 'mr-10')}>
      <div className="mr-2">
        <p className="text text_type_digits-medium">{total}</p>
      </div>
      <div>
        <CurrencyIcon type="primary"/>
      </div>
    </div>
  );
};

Price.propTypes = {
  total: PropTypes.number.isRequired
};

const bunNameFormatter = (name, direction) => {
  if (!name) {
    return;
  }

  return name + (direction === 'top' ? ' (вeрх)' : ' (низ)');
};

const initialState = { totalPrice: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'setTotalPrice':
      return { totalPrice: action.payload };
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

const sendOrder = (ingredients) => {
  const ids = ingredients.map(({ _id }) => _id);

  return fetch(OrdersURL, {
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

    const bun = ingredients.filter((el) => el.type === 'bun')[0];
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
    sendOrder(ingredients)
      .then((orderId) => {
        setOrderId(orderId);
        setShowOrderDetails(true);
      }).catch((e) => {
        setError(typeof e === 'string' ? e : e.message);
      }).finally(()=> {
        setIsLoading(false);
      })
  }, [ingredients, setError]);

  const handleCloseOrderDetails = useCallback(() => {
    setShowOrderDetails(false);
  }, []);

  return (
    <div className={cx('pt-25 pl-4 pr-4')}>
      <div className={cx(styles['constructor-wrapper'], 'mb-10')}>
        {elements.bun && (<Bun bun={elements.bun} type="top"/>)}
        <div
          className={cx(styles.list, styles['constructor-container'])}>
          {elements?.constructorElements && elements.constructorElements.map((item) => {
            return (
              <div key={item._id}
                   className={styles['constructor-element']}>
                <DragIconWrapper/>
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
        <Price total={state.totalPrice}/>
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
