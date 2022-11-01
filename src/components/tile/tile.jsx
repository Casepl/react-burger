import cx from 'classnames';
import { useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { selectIngredient }
  from '../../services/actions/ingridient-details';
import {
  Counter,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientType } from '../../constants/burgers-prop-type';
import PropTypes from 'prop-types';
import styles from './tile.module.css';


const Tile = (props) => {
  const {item: {name, image, price}, count} = props;
  const dispatch = useDispatch();

  const [{ opacity }, dragRef] = useDrag({
    type: 'ingredient',
    item: { ...props.item },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });

  const handleTileClick = () => {
    dispatch(selectIngredient(props.item));
  }

  return (
    <div ref={dragRef}
         draggable
         className={styles['tile-container']}
         style={{opacity}}
         onClick={handleTileClick}>
      <div className='mb-2 pl-4 pr-4'>
        <img src={image} alt={name}/>
      </div>
      <div className={cx(styles['price-container'], 'mb-2')}>
        <div className='mr-2'>
          <p className='text text_type_digits-default'>{price}</p>
        </div>
        <CurrencyIcon type='primary'/>
      </div>
      <div>
        <p className={cx('text text_type_main-default', styles['text-center'])}>{name}</p>
      </div>
      {count && (<Counter count={count} size='default'/>)}
    </div>
  )
}


Tile.propTypes = {
  item: ingredientType.isRequired,
  count: PropTypes.number
}

export default Tile;
