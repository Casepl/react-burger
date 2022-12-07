import cx from 'classnames';
import {
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './total-price.module.css';

interface ITotalPriceProps {
  total: number;
}
const TotalPrice = (props: ITotalPriceProps) => {
  const { total } = props;

  return (
    <div className={cx(styles.container, 'mr-10')}>
      <div className="mr-2">
        <p className="text text_type_digits-medium">{total}</p>
      </div>
      <CurrencyIcon type='primary' />
    </div>
  );
};

export default TotalPrice
