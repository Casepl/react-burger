import { useState, useMemo, useCallback } from 'react';
import cx from 'classnames';
import Tabs from '../tabs/tabs';
import Group from '../tile-group/tile-group';
import Modal from '../modal/modal';
import IngredientDetails
  from '../ingredient-details/ingridient-details';
import {
  ingredientsArrayType
} from '../../constants/burgers-prop-type';
import styles from './burger-ingredients.module.css';

const filterTypes = (type) => (item) => {
  return item.type === type;
};

const BurgerIngredients = (props) => {
  const { data } = props;
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  const groups = useMemo(() => {
    const buns = data.filter(filterTypes('bun'));
    const sause = data.filter(filterTypes('sauce'));
    const main = data.filter(filterTypes('main'));

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
  }, [data]);

  const handleTileClick = useCallback((ingredient) => {
    setSelectedIngredient(ingredient);
  }, []);

  const handleDetailsClose = useCallback(() => {
    setSelectedIngredient(null);
  }, []);

  return (
    <div className="pt-10">
      <div className="mb-5">
        <p className="text text_type_main-large">Собери бургер</p>
      </div>
      <div className="mb-10">
        <Tabs/>
      </div>
      <div className={cx(styles.list, 'custom-scroll')}>
        {groups.map((group, index) => {
          return (<Group
            key={index + group.title} {...group}
            onTileClick={handleTileClick}
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

BurgerIngredients.propTypes = {
  data: ingredientsArrayType.isRequired
};

export default BurgerIngredients;
