import cx from 'classnames';
import Tile from '../tile/tile';
import styles
  from './tile-group.module.css';
import PropTypes from 'prop-types';
import {
  ingredientsArrayType
} from '../../constants/burgers-prop-type';

const TileGroup = (props) => {
  const {title, list, onTileClick} = props;

  return (
    <div>
      <div>
        <p className='text text_type_main-medium'>{title}</p>
      </div>
      <div className={cx(styles['tile-list-container'], 'pt-6', 'pl-4', 'pb-10')}>
        {list.map((item) => {
          return (
            <Tile key={item._id} item={item} onTileClick={() => {
              onTileClick(item);
            }}/>
          );
        })}
      </div>
    </div>
  );
}

TileGroup.propTypes = {
  title: PropTypes.string.isRequired,
  list: ingredientsArrayType.isRequired,
  onTileClick: PropTypes.func.isRequired
}


export default TileGroup;
