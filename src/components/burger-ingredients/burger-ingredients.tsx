import {
  useMemo,
  useEffect,
  useCallback,
  useRef
} from 'react';
import { useDispatch} from "../../hooks/useDispatch";
import { useSelector } from "../../hooks/useSelector";
import { tabSwitch } from '../../services/actions/tab-switch';
import { useInView } from 'react-intersection-observer';
import cx from 'classnames';
import Tabs from '../tabs/tabs';
import Group from '../tile-group/tile-group';
import styles from './burger-ingredients.module.css';

import type {IIngredientProps} from "../../constants/burgers-prop-type";

const filterTypes = (type: string) => (item: IIngredientProps) => {
  return item.type === type;
};


const BurgerIngredients = () => {
  const dispatch = useDispatch();

  const bunsRef = useRef<HTMLDivElement>();
  const mainsRef = useRef<HTMLDivElement>();
  const saucesRef = useRef<HTMLDivElement>();

  const {ref: inViewBunRef, inView: inViewBuns} = useInView({
    threshold: 0,
  });

  const {ref: inViewSaucesRef, inView: inViewSauces} = useInView({
    threshold: 0,
  });
  const {ref: inViewMainRef, inView: inViewFilling} = useInView({
    threshold: 0,
  });

  const setInViewBunRefRef = useCallback(
    (node: HTMLDivElement) => {
      bunsRef.current = node;
      inViewBunRef(node);
    },
    [inViewBunRef],
  );
  const setInViewSauseRef = useCallback(
    (node: HTMLDivElement) => {
      saucesRef.current = node;
      inViewSaucesRef(node);
    },
    [inViewSaucesRef],
  );
  const setInViewMainRef = useCallback(
    (node: HTMLDivElement) => {
      mainsRef.current = node;
      inViewMainRef(node);
    },
    [inViewMainRef],
  );

  const inViewRefs: Array<(node: HTMLDivElement) => void> = [setInViewBunRefRef, setInViewSauseRef, setInViewMainRef];

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

  const handleClickTab = (value: string) => {
    if(value === 'bun') {
      bunsRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (value === 'sauce') {
      saucesRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (value === 'main') {
      mainsRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };



  return (
    <div className="pt-10">
      <div className="mb-5">
        <p className="text text_type_main-large">Собери бургер</p>
      </div>
      <div className="mb-10">
        <Tabs onClick={handleClickTab} />
      </div>
      <div className={cx(styles.list, 'custom-scroll')}>
        {groups.map((group, index) => {
          return (<Group
            counterMap={counterMap}
            ref={inViewRefs[index]}
            key={index + group.title} {...group}
          />);
        })}
      </div>
    </div>
  );
};

export default BurgerIngredients;
