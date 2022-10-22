import {
  useMemo,
  useEffect,
  useCallback,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getIngredients
} from '../../services/actions/ingridients';
import { tabSwitch } from '../../services/actions/tab-switch';
import { useInView } from 'react-intersection-observer';
import { deSelectIngredient }
  from '../../services/actions/ingridient-details';
import cx from 'classnames';
import Tabs from '../tabs/tabs';
import Group from '../tile-group/tile-group';
import Modal from '../modal/modal';
import IngredientDetails
  from '../ingredient-details/ingridient-details';
import styles from './burger-ingredients.module.css';

const filterTypes = (type) => (item) => {
  return item.type === type;
};


const BurgerIngredients = (props) => {
  const dispatch = useDispatch();

  const [bunsRef, inViewBuns] = useInView({
    threshold: 0,
  });

  const [mainsRef, inViewFilling] = useInView({
    threshold: 0,
  });
  const [saucesRef, inViewSauces] = useInView({
    threshold: 0,
  });

  const refs  = [bunsRef, saucesRef, mainsRef];

  useEffect(() => {
    if (inViewBuns) {
      dispatch(tabSwitch('buns'));
    } else if (inViewSauces) {
      dispatch(tabSwitch('sauces'));
    } else if (inViewFilling) {
      dispatch(tabSwitch('mains'));
    }
  }, [dispatch, inViewBuns, inViewFilling, inViewSauces]);

  const { ingredientsRequest, ingredients } =
    useSelector((store) => store.ingredients);
  const constructorElements =
    useSelector((store) => store.burgerConstructor);

  const selectedIngredient =
    useSelector((store) => store.selectIngredient);

  const counterMap = useMemo(() => {
    const map = new Map();
    for(const ingredient of constructorElements) {
      const id = ingredient._id;
      if(map.has(id)) {
        const value = map.get(id);
        map.set(id, value+1);
      } else {
        map.set(id, 1);
      }
    }

    return map;
  }, [constructorElements]);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const groups = useMemo(() => {
    if (ingredientsRequest) {
      return [{
        title: 'Булки',
        list: []
      }, {
        title: 'Cоусы',
        list: []
      }, {
        title: 'Начинки',
        list: []
      }];
    }

    const buns = ingredients.filter(filterTypes('bun'));
    const sause = ingredients.filter(filterTypes('sauce'));
    const main = ingredients.filter(filterTypes('main'));

    return [{
      title: 'Булки',
      list: buns
    }, {
      title: 'Cоусы',
      list: sause
    }, {
      title: 'Начинки',
      list: main
    }];
  }, [ingredients, ingredientsRequest ]);


  const handleDetailsClose = useCallback(() => {
    dispatch(deSelectIngredient());
  }, [dispatch]);

  return (
    <div className="pt-10">
      <div className="mb-5">
        <p className="text text_type_main-large">Собери бургер</p>
      </div>
      <div className="mb-10">
        <Tabs />
      </div>
      <div className={cx(styles.list, 'custom-scroll')}>
        {groups.map((group, index) => {
          return (<Group
            counterMap={counterMap}
            ref={refs[index]}
            key={index + group.title} {...group}
          />);
        })}
      </div>
      {selectedIngredient && (
        <Modal header="Детали ингредиента"
               onClose={handleDetailsClose}>
          <IngredientDetails ingredient={selectedIngredient}/>
        </Modal>)
      }
    </div>
  );
};

export default BurgerIngredients;
