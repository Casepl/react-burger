import cx from 'classnames';
import {
  Counter,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientType } from '../../constants/burgers-prop-type';
import PropTypes from 'prop-types';
import styles from './tile.module.css';

const Tile = (props) => {
  const {item: {name, image, price}, onTileClick, count} = props;

  return (
    <div className={styles['tile-container']} onClick={onTileClick}>
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
  onTileClick: PropTypes.func
}

export default Tile;
