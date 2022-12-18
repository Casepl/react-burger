import React from 'react';
import { v4 } from 'uuid';
import cx from 'classnames';
import style from './order-status-column.module.css';

interface IOrderStatusProps {
    orders: ReadonlyArray<number>
    color: string
    head: string
}

const MAX_COLUMN_COUNT = 10;
const OrderStatusColumn = ({orders, color='accent', head}: IOrderStatusProps) => {
    return (
        <div>
            <div className='mb-6'>
                <p className='text text_type_main-medium'>{head}</p>
            </div>
            <div className={style['column-wrapper']} style={{gridTemplateColumns: `repeat(${Math.ceil(orders.length/MAX_COLUMN_COUNT)}, 1fr)`}}>
                {orders.map((number) => {
                    return (<p key={v4()} className={cx('text text_type_digits-default', `text_color_${color}`)}>{number}</p>)
                })}
            </div>
        </div>
    );
};

export default OrderStatusColumn;
