import { useMemo } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import bunNameFormatter from '../../utils/bun-name-formater';
import {
  ConstructorElement
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientType } from '../../constants/burgers-prop-type';
import styles
  from '../burger-constructor/burger-constructor.module.css';


const Bun = (props) => {
  const {
    bun: {
      _id,
      name,
      price,
      image_mobile
    },
    type
  } = props;

  const bunName = useMemo(() => {
    return bunNameFormatter(name, type);
  }, [name, type]);

  return (
    <>
      {name && (
        <div className={cx(styles['container'], 'pl-8')}>
          <ConstructorElement
            key={_id}
            type={type}
            isLocked
            text={bunName}
            price={price}
            thumbnail={image_mobile}
          />
        </div>)}
    </>
  );
};

Bun.prototype = {
  bun: ingredientType.isRequired,
  type: PropTypes.string.isRequired
};

export default Bun;
