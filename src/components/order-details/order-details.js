import PropTypes from 'prop-types';
import cx from 'classnames';
import Modal from "../modal/modal";
import orderDoneImg from '../../images/order-done.png';
import styles from './order-details.module.css';

const OrderDetails = (props) => {
    const { onClose } = props;


    return (
        <Modal onClose={onClose}>
            <div className='pb-20'>
                <div className='mb-8 mt-4'>
                    <p className={cx('text text_type_digits-large', styles['center-text'], styles['order-number-hg'])}>034536</p>
                </div>
                <div className='mb-15'>
                    <p className={cx('text text_type_main-default', styles['center-text'])}>
                        идентификатор заказа
                    </p>
                </div>
                <div className={cx(styles.center, 'mb-15')}>
                    <img src={orderDoneImg} alt='заказ готов' />
                </div>
                <div className='mb-2'>
                    <p className={cx('text text_type_main-small', styles['center-text'])}>
                        Ваш заказ начали готовить</p>
                </div>
                <div>
                    <p className={cx('text text_type_main-small text_color_inactive', styles['center-text'])}>
                        Дождитесь готовности на орбитальной станции
                    </p>
                </div>
            </div>
        </Modal>
    )
}

OrderDetails.propTypes = {
    onClose: PropTypes.func.isRequired
}

export default OrderDetails;
