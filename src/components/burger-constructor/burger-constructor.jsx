import { useMemo } from 'react';
import cx from 'classnames';
import {ConstructorElement, DragIcon, CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import burgersPropType from '../../constants/BurgersPropType';
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
    const { _id, type, name, price, image_mobile } = props;

    return (
        <div className={cx(styles['constructor-element'], 'pl-8')}>
            <ConstructorElement
                key={_id}
                type={type}
                isLocked
                text={name}
                price={price}
                thumbnail={image_mobile}
            />
        </div>
    );
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

const bunNameFormatter = (name, direction) => {
    return name + (direction === 'up' ? ' (вeрх)' : ' (вниз)');
}

const BurgerConstructor = (props) => {
    const {data} = props;

    const elements = useMemo(()=> {
        const constructorElements = data.filter((el) => el.type !== 'bun');
        const bun = {...data[0]};

        return {
            bun,
            constructorElements
        }
    }, [data]);

    return (
        <div className={cx('pt-25 pl-4 pr-4')}>
            <div className={cx(styles['constructor-wrapper'], 'mb-10')}>
                <Bun {...elements.bun} type='top' name={bunNameFormatter(elements.bun.name, 'up')} />
                <div className={cx(styles.list, styles['constructor-container'])}>
                    {elements.constructorElements.map((item) => {
                        return (
                            <div  key={item._id} className={styles['constructor-element']}>
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
                <Bun {...elements.bun} type='bottom' name={bunNameFormatter(elements.bun.name, 'down')} />
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
