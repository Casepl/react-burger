import cx from 'classnames';
import orderDoneImg from '../../images/order-done.png';
import styles from './order-details.module.css';
import PropTypes from 'prop-types';

const OrderDetails = ({ orderId }) => {
  return (
    <div className="pb-20">
      <div className="mb-8 mt-4">
        <p
          className={cx(
            'text text_type_digits-large',
            styles['center-text'],
            styles['order-number-hg'])}
        >
          {orderId}
        </p>
      </div>
      <div className="mb-15">
        <p
          className={cx('text text_type_main-default', styles['center-text'])}>
          идентификатор заказа
        </p>
      </div>
      <div className={cx(styles.center, 'mb-15')}>
        <img src={orderDoneImg} alt="заказ готов"/>
      </div>
      <div className="mb-2">
        <p
          className={cx('text text_type_main-small', styles['center-text'])}>
          Ваш заказ начали готовить</p>
      </div>
      <div>
        <p
          className={cx('text text_type_main-small text_color_inactive', styles['center-text'])}>
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
    </div>
  );
};

OrderDetails.propTypes = {
  orderId: PropTypes.number
};

export default OrderDetails;
