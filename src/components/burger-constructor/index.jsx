import cx from 'classnames';
import {ConstructorElement, DragIcon, CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import burgersPropType from '../../constants/BurgersPropType';
import styles from './index.module.css';
import PropTypes from "prop-types";



const DragIconWrapper = () => {
    return (
        <div className='mr-2'>
            <DragIcon type='primary'/>
        </div>
    )
}

const Price = (props) => {
    const { total } = props;

    return (
        <div className={cx(styles['price-container'], 'mr-10')}>
            <div className='mr-2'>
                <p className='text text_type_digits-medium'>{total}</p>
            </div>
            <div>
                <CurrencyIcon type='primary'/>
            </div>
        </div>
    )
}

Price.propTypes = {
    total: PropTypes.number.isRequired
}

const BurgerConstructor = (props) => {
    const {data} = props;

    return (
        <div className={cx('pt-25 pl-4 pr-4')}>
            <div className={cx(styles.list, styles['constructor-container'], 'mb-10')}>
                {data.map((item) => {
                    const isLocked = item.type === 'bun';
                    return (
                        <div  key={item._id} className={cx({'pl-8': isLocked}, styles['constructor-element'])}>
                            {!isLocked && <DragIconWrapper/>}
                            <ConstructorElement
                                key={item._id}
                                type={item.type}
                                isLocked={isLocked}
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image_mobile}
                            />
                        </div>
                    )
                })}
            </div>
            <div className={styles['order-container']}>
                <Price total={610} />
                <Button type='primary' size='medium' htmlType='button' >
                    Оформить заказ
                </Button>
            </div>
        </div>
    )
}
BurgerConstructor.propTypes = {
    data: burgersPropType
}
export default BurgerConstructor;
