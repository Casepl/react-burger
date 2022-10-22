import { forwardRef } from 'react';
import cx from 'classnames';
import Tile from '../tile/tile';
import styles
  from './tile-group.module.css';
import PropTypes from 'prop-types';
import {
  ingredientsArrayType
} from '../../constants/burgers-prop-type';

const TileGroup = forwardRef((props, ref) => {
  const {title, list, counterMap} = props;

  return (
    <div ref={ref}>
      <div>
        <p className='text text_type_main-medium'>{title}</p>
      </div>
      <div className={cx(styles['tile-list-container'], 'pt-6', 'pl-4', 'pb-10')}>
        {list.map((item) => {
          const count = counterMap.get(item._id);

          return (
            <Tile key={item._id} count={count} item={item} />
          );
        })}
      </div>
    </div>
  );
});

TileGroup.propTypes = {
  title: PropTypes.string.isRequired,
  list: ingredientsArrayType.isRequired,
  counterMap: PropTypes.instanceOf(Map).isRequired
}


export default TileGroup;
