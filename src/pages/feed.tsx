import React, { useEffect } from 'react';
import {WS_FEED_CLOSE_SOCKET, WS_FEED_CONNECTION_START} from '../services/actions/feed';
import cx from 'classnames';
import {useDispatch} from "../hooks/useDispatch";
import {useSelector} from "../hooks/useSelector";
import { FEED_SOCKET_URL } from "../constants/url-list";
import Loader from "../components/loader/loader";
import FeedOrders from "../components/feed-orders/feed-orders";
import OrderStatusTable from "../components/order-status-table/order-status-table";
import styles from '../components/app/app.module.css';

const FeedPage = () => {
    const dispatch = useDispatch();
    const { wsConnected, orders, total, totalToday  } = useSelector((store) => store.feed);

    useEffect(() => {
                dispatch({ type: WS_FEED_CONNECTION_START, payload: FEED_SOCKET_URL });
                return () => {
                    dispatch({ type: WS_FEED_CLOSE_SOCKET});
                }
        },
        [dispatch]
    );

    if(!wsConnected) {
        return (<Loader />)
    }
    return (
        <main className={cx(styles['content-root'])}>
            <div className="mb-5">
                <p className="text text_type_main-large">Лента заказов</p>
            </div>
            <section className={styles['content-container']}>
                    <FeedOrders orders={orders}/>
                    <OrderStatusTable orders={orders} total={total} totalToday={totalToday} />
            </section>
        </main>
    );
}

export default FeedPage;
