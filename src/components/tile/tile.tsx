import React from 'react';
import cx from 'classnames';
import { useDrag } from 'react-dnd';
import { useLocation, Link } from 'react-router-dom';
import {
  Counter,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import {
  IIngredientProps
} from '../../constants/burgers-prop-type';

import styles from './tile.module.css';


interface ITileProps {
  item: IIngredientProps;
  count?: number;
}

const Tile = (props: ITileProps) => {
  const {
    item: {
      _id,
      name,
      image,
      price,
      type
    },
    count
  } = props;
  const location = useLocation();

  const [{ opacity }, dragRef] = useDrag({
    type: 'ingredient',
    item: { ...props.item },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });

  return (
    <Link
      data-test-id={`${type}`}
      state={{ background: location }}
      to={{
        pathname: `/ingredients/${_id}`,
      }} ref={dragRef}
      draggable
      className={cx(styles['tile-container'],
        'text text_type_main-default text_color_primary',
        styles.link)}
      style={{ opacity }}>
      <div className="mb-2 pl-4 pr-4">
        <img src={image} alt={name}/>
      </div>
      <div className={cx(styles['price-container'], 'mb-2')}>
        <div className="mr-2">
          <p className="text text_type_digits-default">{price}</p>
        </div>
        <CurrencyIcon type="primary"/>
      </div>
      <div>
        <p
          className={cx('text text_type_main-default', styles['text-center'])}>{name}</p>
      </div>
      {count && (<Counter count={count} size="default"/>)}
    </Link>
  );
};

export default Tile;
