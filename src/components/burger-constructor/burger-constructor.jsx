import {useCallback, useMemo, useState} from 'react';
import cx from 'classnames';
import {ConstructorElement, DragIcon, CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import {ingredientsArrayType, ingredientType} from '../../constants/burgers-prop-type';
import styles from './burger-constructor.module.css';
import PropTypes from "prop-types";


const DragIconWrapper = () => {
    return (
        <div className='mr-2'>
            <DragIcon type='primary'/>
        </div>
    )
}

const Bun = (props) => {
    const {bun: {_id, name, price, image_mobile}, type} = props;

    const bunName = useMemo(() => {
        return bunNameFormatter(name, type);
    }, [name, type]);

    return (
        <>
            {name && (<div className={cx(styles['constructor-element'], 'pl-8')}>
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
}

Bun.prototype = {
    bun: ingredientType.isRequired,
    type: PropTypes.string.isRequired
}

const Price = (props) => {
    const {total} = props;

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

const bunNameFormatter = (name, direction) => {
    if (!name) {
        return;
    }

    return name + (direction === 'top' ? ' (вeрх)' : ' (низ)');
}

const BurgerConstructor = (props) => {
    const [isShowOrderDetails, setShowOrderDetails] = useState(false);

    const {data} = props;

    const elements = useMemo(() => {
        const constructorElements = data.filter((el) => el.type !== 'bun');
        const bun = {...data[0]};

        return {
            bun,
            constructorElements
        }
    }, [data]);


    const handleOrderClick = useCallback(() => {
        setShowOrderDetails(true);
    }, []);

    const handleCloseOrderDetails = useCallback(() => {
        setShowOrderDetails(false);
    }, [])

    return (
        <div className={cx('pt-25 pl-4 pr-4')}>
            <div className={cx(styles['constructor-wrapper'], 'mb-10')}>
                <Bun bun={elements.bun} type='top' />
                <div className={cx(styles.list, styles['constructor-container'])}>
                    {elements.constructorElements.map((item) => {
                        return (
                            <div key={item._id} className={styles['constructor-element']}>
                                <DragIconWrapper/>
                                <ConstructorElement
                                    key={item._id}
                                    type={item.type}
                                    text={item.name}
                                    price={item.price}
                                    thumbnail={item.image_mobile}
                                />
                            </div>
                        )
                    })}
                </div>
                <Bun bun={elements.bun} type='bottom'/>
            </div>
            <div className={styles['order-container']}>
                <Price total={610}/>
                <Button type='primary' size='medium' htmlType='button' onClick={handleOrderClick}>
                    Оформить заказ
                </Button>
            </div>
            {isShowOrderDetails && (
                <Modal onClose={handleCloseOrderDetails}>
                    <OrderDetails/>
                </Modal>)
            }
        </div>
    )
}
BurgerConstructor.propTypes = {
    data: ingredientsArrayType.isRequired
}
export default BurgerConstructor;
