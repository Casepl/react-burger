import React, {useMemo} from 'react';
import { v4 } from 'uuid';
import cx from 'classnames';
import style from './order-status-column.module.css';

interface IOrderStatusProps {
    orders: ReadonlyArray<number>
    color: string
    head: string
}

const MAX_RECORDS = 10;
const MAX_COLUMNS = 3;
const OrderStatusColumn = ({orders = [], color='accent', head}: IOrderStatusProps) => {
    const ordersLength = orders.length;
    const columnsNumber = useMemo(()=>{
        return Math.ceil(ordersLength/MAX_RECORDS);
    }, [ordersLength])
    return (
        <div>
            <div className='mb-6'>
                <p className='text text_type_main-medium'>{head}</p>
            </div>
            <div className={style['column-wrapper']}
                 style={{gridTemplateColumns: `repeat(${columnsNumber > MAX_COLUMNS ? MAX_COLUMNS : columnsNumber}, min-content)`}}>
                {orders.map((number) => {
                    return (<p key={v4()} className={cx('text text_type_digits-default', `text_color_${color}`)}>{number}</p>)
                })}
            </div>
        </div>
    );
};

export default OrderStatusColumn;
