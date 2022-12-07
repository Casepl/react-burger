import { forwardRef } from 'react';
import cx from 'classnames';
import Tile from '../tile/tile';
import styles from './tile-group.module.css';

import { ingredientsArrayType } from '../../constants/burgers-prop-type';

interface ITileGroupProps {
    counterMap: Map<string, number>;
    list: ingredientsArrayType;
    title: string;
}
const TileGroup = forwardRef<HTMLDivElement, ITileGroupProps>((props, ref) => {
  const {title, list, counterMap} = props;

  return (
    <div>
      <div ref={ref}>
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

export default TileGroup;
