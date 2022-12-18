import React, { useMemo } from "react";
import styles from './order-status.module.css';
import {DONE, PENDING } from "../../constants/order-status";
import OrderStatusColumn from "../order-status-column/order-status-column";
import TotalOrderInfo from "../total-order-info/total-order-info";
import {IOrder} from "../../services/types/data";


interface IOrderStatusTableProps {
    total: number,
    totalToday: number,
    orders: ReadonlyArray<IOrder>
}
const OrderStatusTable = ({ orders, total, totalToday }: IOrderStatusTableProps) => {
    const ordersStatuses = useMemo(() =>{
        const done = orders.filter((order) => order.status === DONE).map((order) => order.number);
        const pending = orders.filter((order) => order.status === PENDING).map((order) => order.number);

        return {
            done: done,
            pending: pending
        }
    }, [orders])

    return (
        <div className={styles.root}>
            <div className={styles['order-status-table']}>
                <OrderStatusColumn orders={ordersStatuses.done} color='success' head='Готовы:' />
                <OrderStatusColumn orders={ordersStatuses.pending} color='primary' head='В работе:' />
            </div>
            <TotalOrderInfo head='Выполнено за все время:' total={total} />
            <TotalOrderInfo head='Выполнено за сегодня:' total={totalToday} />
        </div>
    );
};

export default OrderStatusTable;
