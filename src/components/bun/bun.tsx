import { FC, useMemo } from 'react';
import cx from 'classnames';
import bunNameFormatter from '../../utils/bun-name-formater';
import {
  ConstructorElement
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../burger-constructor/burger-constructor.module.css';


import { IIngredientProps } from '../../constants/burgers-prop-type';


interface IBunProps {
  bun: IIngredientProps,
  type?: 'top' | 'bottom'
}

const Bun: FC<IBunProps> = (props) => {
  const {
    bun: {
      _id,
      name,
      price,
      image_mobile
    },
    type
  } = props;

  const bunName = useMemo<string>(() => {
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

export default Bun;
