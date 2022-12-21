import {
  useCallback,
  useMemo,
  useReducer
} from 'react';
import cx from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import { useDrop } from 'react-dnd';
import { useDispatch } from "../../hooks/useDispatch";
import { useSelector } from "../../hooks/useSelector";
import { useNavigate } from 'react-router-dom';
import { addComponent, updateConstructorList }
  from '../../services/actions/burger-constructor';
import { applyOrder, clearOrder } from '../../services/actions/order';
import {
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import Bun from '../bun/bun';
import TotalPrice from '../total-price/total-price';
import ConstructorElement
  from '../constructor-element/constructor-element';
import styles from './burger-constructor.module.css';
import {
  ConstructorElementArrayType, IIngredientProps
} from "../../constants/burgers-prop-type";

const initialState = { totalPrice: 0 };

const BUN_OFFSET = 1;


enum TotalPriceActionKind {
  SETTOTALPRICE = 'setTotalPrice',
  RESETTOTALPRICE = 'resetTotalPrice',
}


interface TotalPriceAction {
  type: TotalPriceActionKind;
  payload: number;
}

interface TotalPriceState {
  totalPrice: number;
}

function reducer(state: TotalPriceState, action: TotalPriceAction) {
  switch (action.type) {
    case TotalPriceActionKind.SETTOTALPRICE:
      return { totalPrice: action.payload };
    case TotalPriceActionKind.RESETTOTALPRICE:
      return initialState;
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

const BurgerConstructor = () => {
  const [state, reactDispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const { user } = useSelector((store) => store.auth);

  const ingredients = useSelector((store) => store.burgerConstructor);

  const isOrderLoading = useSelector((store) => store.order.orderRequest);

  const order = useSelector((store) => store.order.response);

  const dispatch = useDispatch();

  const [, dropTargetRef] = useDrop<IIngredientProps>({
    accept: 'ingredient',
    drop(item) {

      dispatch(addComponent({
        ...item,
        dragId: uuidv4()
      }));
    }
  });

  const elements = useMemo(() => {
    if (!ingredients || !ingredients.length) {
      return {};
    }

    const bun = ingredients.find((el) => el.type === 'bun');
    const constructorElements = ingredients.filter((el) => el.type !== 'bun') as ConstructorElementArrayType;

    const constructorElementsSum = constructorElements.reduce((acc, element) => {
      return acc + element.price;
    }, 0);

    reactDispatch({
      type: TotalPriceActionKind.SETTOTALPRICE,
      payload: (bun?.price ?? 0) * 2 + constructorElementsSum
    });

    return {
      bun,
      constructorElements
    };
  }, [ingredients]);

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    const dragCard = ingredients[dragIndex];
    const newCards = [...ingredients];

    newCards.splice(dragIndex, 1);

    newCards.splice(hoverIndex, 0, dragCard);

    dispatch(updateConstructorList(newCards));
  }, [ingredients, dispatch]);

  const handleOrderClick = useCallback(() => {
    if (!user) {
      navigate('/login', { state: { redirectTo: '/' } });
      return;
    }

    const ingridients = [elements.bun,
      ...(elements.constructorElements || []), elements.bun] as ConstructorElementArrayType;

    dispatch(applyOrder(ingridients));
  }, [user, navigate, dispatch,
    elements.bun, elements.constructorElements]);

  const handleCloseOrderDetails = useCallback(() => {

    reactDispatch({
      type: TotalPriceActionKind.RESETTOTALPRICE,
      payload: 0
    });

    dispatch(clearOrder());
  }, [dispatch]);

  return (
    <div data-test-id="burger-constructor-drop" className={cx('pt-25 pl-4 pr-4')}
         ref={dropTargetRef}>
      <div className={cx(styles['constructor-wrapper'], 'mb-10')}>
        {elements.bun && (<Bun bun={elements.bun} type="top"/>)}
        <div
          className={cx(styles.list, styles['constructor-container'], 'custom-scroll')}>
          {elements?.constructorElements && elements.constructorElements.map((item, index) => {
            return (
              <ConstructorElement
                key={item.dragId}
                item={item}
                index={index + BUN_OFFSET}
                moveCard={moveCard}
              />
            );
          })}
        </div>
        {elements.bun && (<Bun bun={elements.bun} type="bottom"/>)}
      </div>
      <div className={styles['order-container']}>
        <TotalPrice total={state.totalPrice}/>
        <Button data-test-id="order-button"
                disabled={isOrderLoading || (!elements.bun || !elements?.constructorElements?.length)}
                type="primary"
                size="medium"
                htmlType="button"
                onClick={handleOrderClick}>
          Оформить заказ
        </Button>
      </div>
      {order && (
        <Modal onClose={handleCloseOrderDetails}>
          <OrderDetails/>
        </Modal>)
      }
    </div>
  );
};

export default BurgerConstructor;
